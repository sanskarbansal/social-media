const express = require("express");
const Post = require("../../../models/Post");
const router = express.Router();
const Comment = require("../../../models/Comment");
const Like = require("../../../models/Like");

// router.post("/get", async (req, res) => {
//     const { postId } = req.body;
//     if (!postId || postId.length != 24)
//         return res.json({
//             error: "ERROR WHILE FETCHING COMMENTS, MAYBE INVALID POST ID",
//         });
//     let comments = await Comment.find({ post: postId });
//     if (!comments)
//         return res.json({
//             error: "NO COMMENTS FOUND RELATED TO THIS POST ID",
//         });
//     res.json({
//         comments,
//     });
// });
router.post("/create", async (req, res) => {
    const { postId, body } = req.body;
    if (!postId || !body || postId.length != 24)
        return res.json({
            error: "ERROR WHILE CREATING COMMENT",
        });
    let post = await Post.findById(postId);
    if (!post)
        return res.json({
            error: "NO POST FOUND ON WHICH USER IS COMMENTING",
        });
    let comment = await Comment.create({ post: postId, user: req.user._id, body });
    await post.comments.push(comment._id);
    await post.save();
    if (!comment)
        return res.json({
            error: "ERROR WHILE CREATING COMMENT",
        });

    comment = await comment
        .populate({
            path: "user",
            select: "firstName lastName ",
        })
        .populate({
            path: "likes",
            select: "user",
            populate: {
                path: "user",
                select: "username firstName lastName",
            },
        })
        .execPopulate();
    res.json({
        message: "COMMENT CREATED SUCCESSFULLY",
        comment,
    });
});

router.post("/delete", async (req, res) => {
    const { cId } = req.body;
    if (!cId || cId.length != 24)
        return res.json({
            error: "DON'T TRY TO EXPLOIT.",
        });
    let comment = await Comment.findById(cId);
    if (!comment)
        return res.json({
            error: "NO SUCH COMMENT FOUND",
        });
    if (comment.user != req.user._id) {
        return res.json({
            error: "YOU ARE NOT PERMITTED TO PERFORM THIS ACTION.",
        });
    }
    await Like.deleteMany({ likeable: cId });
    comment.remove();
    res.json({
        message: "COMMENT DELETED SUCCESSFULLY",
    });
});

module.exports = router;
