const mongoose = require("mongoose");
const Like = require("./Like");
const Comment = require("./Comment");
const Post = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "comment",
            },
        ],
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

Post.post("remove", async (doc, next) => {
    let comments = await Comment.find({ post: doc._id });

    for (let comment of comments) {
        await comment.remove();
    }
    await Like.deleteMany({ likeable: doc._id });
    next();
});

module.exports = mongoose.model("post", Post);
