const express = require("express");
const User = require("../../../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");

//Check if user already exists or not, if user exists, then don't create else create a new user.
router.post("/signup", async (req, res) => {
    User.uploadAvatar(req, res, async (err) => {
        const { firstName, lastName, username, password, mobileNumber, email } = req.body;
        if (err) res.json({ error: "Error while uploading image." });
        let user = await User.findOne({ $or: [{ username }, { mobileNumber }, { email }] });
        if (user) {
            return res.status(404).json({
                error: "USER ALREADY EXISTS",
            });
        }
        if (req.file)
            user = await User.create({ firstName, lastName, username, password, mobileNumber, email, avatar: User.AVATAR_PATH + "/" + req.file.filename });
        else user = await User.create({ firstName, lastName, username, password, mobileNumber, email });

        if (user)
            return res.status(200).json({
                message: "USER CREATED SUCCESSFULLY",
            });
        res.status(404).json({
            error: "ERROR WHILE CREATING USER",
        });
    });
});

//If username or email found of a user then check if the password is same. if yes create a new token and send it to client.
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    let user = await User.findOne({ $or: [{ username }] });
    if (!user || user.password != password)
        return res.status(403).json({
            error: "WRONG EMAIL/PASSWORD",
        });
    const { firstName, lastName, email, mobileNumber, address, _id, avatar } = user;
    const token = jwt.sign(JSON.stringify({ username, firstName, lastName, email, mobileNumber, address, _id, avatar }), process.env.SECRETE_KEY);
    res.status(200).json({
        token,
    });
});

router.get("/", async (req, res) => {
    // const users = await User.find({ $or: [{ firstName: /^req.query.s/ }, { username: `/^${req.query.s}/` }], select: "firstName lastName username" });
    let { s, limit = 5, page } = req.query;
    s = `^${s}`;
    limit = parseInt(limit);
    page = parseInt(page);
    if (s === "^") return res.json({ users: [] });
    const users = await User.find({
        $or: [{ firstName: { $regex: s, $options: "m" } }, { username: { $regex: s, $options: "m" } }],
    })
        .select("firstName lastName username email mobileNumber friends avatar")
        .populate({ path: "friends", select: "firstName lastName username avatar" })
        .limit(limit || 5)
        .skip((page - 1) * (limit || 5));
    res.json({
        users,
    });
});

module.exports = router;
