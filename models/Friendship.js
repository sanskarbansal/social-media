const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Friendship = new Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        reciever: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        status: {
            type: Number,
            enum: [0, 1, 2], // 0 pending, 1 accepted, 2 rejected
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("friendship", Friendship);

// seen: {
//     type: Boolean,
//     default: false,  //Can be used later.
// },
