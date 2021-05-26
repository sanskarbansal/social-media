const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AVATAR_PATH = "/uploads/avatars";
const multer = require("multer");
const path = require("path");
const User = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        mobileNumber: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            default: "India",
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
        ],
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "post",
            },
        ],
        avatar: {
            type: String,
            default: path.join(AVATAR_PATH, "/default-avatar.png"),
        },
    },
    {
        timestamps: true,
    }
);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", AVATAR_PATH));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
User.statics.uploadAvatar = multer({ storage }).single("avatar");
User.statics.AVATAR_PATH = AVATAR_PATH;

module.exports = mongoose.model("user", User);
