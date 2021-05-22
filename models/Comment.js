const mongoose = require("mongoose");

const Like = require("./Like");

const Comment = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "like",
            },
        ],
    },
    {
        timestamps: true,
    }
);

Comment.post("remove", async (doc, next) => {
    await Like.deleteMany({ likeable: doc._id });
    next();
});

module.exports = mongoose.model("comment", Comment);
