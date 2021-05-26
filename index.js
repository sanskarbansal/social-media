require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const db = require("./config/");
const User = require("./models/User");
const PORT = 1337;
app.use(cors());

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/v1/", require("./api/v1/"));

// app.use("/api/v2/", require("./api/v2/"));

app.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`);
});
