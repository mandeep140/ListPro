if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

const express = require("express");
const app = express();
const port = 8080; 
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const path = require("path");
const methOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExperssError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const MONGO_URL = process.env.ATLAS_URL;
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const strategy = require("passport-local");
const User = require("./models/user.js");
const multer  = require('multer');
const upload = multer({ dest: "uploads/" });


main().then(() => {
    console.log("Connected to db");
}).catch(err => {
    console.log("ERROR!!!!!!!!!!!", err)
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);

const store = MongoStore.create({
    mongoUrl: MONGO_URL,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600,
});

store.on("error", ()=>{
    console.log(`Error on mongo session store ${err}`);
});

const sessionOption = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 10 * 24 * 60 * 60 * 1000,
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

const validate = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExperssError(400, error);
    } else {
        next();
    }
}

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExperssError(400, error);
    } else {
        next();
    }
}

  
app.get("/", (req, res) => {
    res.render("listing/home.ejs");
});

app.get("/signup", (req, res) => {
    res.render("listing/signup.ejs");
});

app.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password);
        req.flash("success", "Sign-Up Successfull, now you can login");
        req.login(registeredUser, (err)=>{
            if(err){
                next(err)
            }
            req.flash("success", "Login success, Welcome to ListPro");
            res.redirect("/listings");
        });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}));

app.get("/login", (req, res)=>{
    res.render("listing/login.ejs");
});

app.post("/login", passport.authenticate("local", { failureRedirect: "/login", failureFlash: true}), wrapAsync(async(req, res)=>{
    req.flash("success", "Login success, Welcome to ListPro");
    res.redirect("/listings");
}));

app.get("/logout", (req, res, next)=>{
    req.logOut((err)=>{
        if(err){
            next(err)
        }
    });
    req.flash("success", "User Logged-out");
    res.redirect("listings");
});

app.get("/listings", wrapAsync(async (req, res) => {
    let all = await Listing.find({});
    res.render("listing/listing.ejs", { all })
}));

app.get("/listing/new", (req, res) => {
    if(!req.isAuthenticated()){
        req.flash("error", "You need to login to create new listing");
        return res.redirect("/login");
    }
    res.render("listing/new.ejs");
});

app.post("/listing", validate, wrapAsync(async (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash("error", "You need to login to create new listing");
        return res.redirect("/login");
    }
    let listing = req.body.listing;
    let newList = new Listing(listing);
    newList.owner = req.user._id;
    await newList.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}));

app.get("/listing/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let post = await Listing.findById(id).populate({path:"reviews", populate: {path: "author"}, }).populate("owner");
    if (!post) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }
    res.render("listing/post.ejs", { post });
}));

app.get("/listing/:id/edit", wrapAsync(async (req, res) => {
    if(!req.isAuthenticated()){
        req.flash("error", "You need to login to edit listing");
        return res.redirect("/login");
    }
    let { id } = req.params;
    let post = await Listing.findById(id);
    if (!post) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }
    res.render("listing/edit.ejs", { post });
}));

app.put("/listing/:id", validate, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this listing to edit it");
        return res.redirect(`/listing/${id}`);
    }
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Edited!");
    res.redirect(`/listing/${id}`)
}));

app.delete("/listing/:id", wrapAsync(async (req, res) => {
    if(!req.isAuthenticated()){
        req.flash("error", "You need to login to delete listing");
        return res.redirect("/login");
    }
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this listing to delete it");
        return res.redirect(`/listing/${id}`);
    }
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}));

app.post("/listing/:id/review", validateReview, wrapAsync(async (req, res) => {
    if(!req.isAuthenticated()){
        req.flash("error", "You need to login to create new review");
        return res.redirect("/login");
    }
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "Review Added");
    res.redirect(`/listing/${req.params.id}`)
}));

app.delete("/listing/:id/review/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    if(!req.isAuthenticated()){
        req.flash("error", "You need to login to delete review");
        return res.redirect("/login");
    }

    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You can't delete because you are not owner of that review");
        return res.redirect(`/listing/${id}`);
    }

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");

    res.redirect(`/listing/${id}`);
}));

app.get("/about", (req, res) => {
    res.render("listing/about.ejs");
});

app.all("*", (req, res, next) => {
    next(new ExperssError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Somethong went wrong!" } = err;
    message = "Error: " + message;
    res.status(statusCode).render("listing/error.ejs", { message });
});

app.listen(port, () => {
    console.log(`app is started at port: ${port}`);
});