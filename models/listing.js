const mongoose = require("mongoose");
const Schema = mongoose.Schema
const Review = require("./reviews.js")

const listingitems = new Schema({
    title: String,
    description: String,
    image: {
        type: String,
        default: "https://img.freepik.com/free-photo/beautiful-view-sunset-sea_23-2148019892.jpg?size=626&ext=jpg",
        set: (v) => v === "" ?  "https://img.freepik.com/free-photo/beautiful-view-sunset-sea_23-2148019892.jpg?size=626&ext=jpg" : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

listingitems.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});


const Listing = mongoose.model("Listing", listingitems);
module.exports = Listing;   
