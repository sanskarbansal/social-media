const express = require("express");
const jwt = require("jsonwebtoken");
const Router = express.Router();

const setUser = (req, res, next) => {
    if (!req.headers["authorization"])
        return res.status(403).json({
            error: "PLEASE PROVIDE AUTH TOKEN TO ACCESS THIS.",
        });
    const arr = req.headers["authorization"].split(" ");
    if (arr.length != 2) {
        return res.status(404).json({
            error: "AUTHORIZATION TOKEN NOT FOUND!",
        });
    }
    const token = arr[1];
    const user = jwt.verify(token, process.env.SECRETE_KEY);
    if (!user)
        return res.status(403).json({
            error: "YOU ARE NOT PERMITTED FOR THIS OPERATION!",
        });
    req.user = user;
    next();
};

Router.use("/comment", setUser, require("./CommentRoutes/"));
Router.use("/post", setUser, require("./PostRoutes/"));
Router.use("/user", require("./UserRoutes/"));
Router.use("/like/", setUser, require("./LikeRoutes/"));
Router.use("/friend/", setUser, require("./FriendsRoute/"));
module.exports = Router;
