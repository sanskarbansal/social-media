const mongoose = require("mongoose");

const Like = new mongoose.Schema(
    {
        likeable: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "likeOf",
            required: true,
        },
        likeOf: {
            type: String,
            enum: ["post", "comment"],
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("like", Like);
