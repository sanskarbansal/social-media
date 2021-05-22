const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/socialmedia", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once("connected", () => {
    console.log("Mongodb successfully connected!");
});
db.on("error", (err) => {
    console.error("Error while connecting to mongodb!");
});

module.exports = db;
