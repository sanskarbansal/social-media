require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./config/");
const PORT = 1337;
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: false }));

app.use("/api/v1/", require("./api/v1/"));

// app.use("/api/v2/", require("./api/v2/"));

app.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`);
});

//9991919200
