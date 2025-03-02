const initdata = require("./data.js");
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/listpro";

main().then(() => {
    console.log("Connected to db");
}).catch(err => {
    console.log(err)
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("data was init successfully!");
}

initDB();