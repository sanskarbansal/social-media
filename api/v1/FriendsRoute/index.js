const express = require("express");
const router = express.Router();
const Friendship = require("../../../models/Friendship");
const User = require("../../../models/User");

router
    .route("/")
    .post(async (req, res) => {
        const { friendId } = req.body;
        if (!friendId || friendId.length !== 24) {
            return res.json({ error: "PLEASE PROVIDE A CORRECT FRIEND ID." });
        }
        if (friendId == req.user._id) return res.json({ message: "Are you trying to send request to your self? LOL" });
        const Friend = await User.findById(friendId);
        if (!Friend) {
            return res.json({
                error: "NO SUCH USER FOUND",
            });
        }
        const fr = await Friendship.find({
            $or: [
                { sender: req.user._id, reciever: friendId },
                { reciever: req.user._id, sender: friendId },
            ],
        });
        if (fr.length > 0) return res.json(fr);

        await Friendship.create({
            sender: req.user._id,
            reciever: friendId,
        });
        return res.json({
            message: "Friend Request sent.",
        });
    })
    .get(async (req, res) => {
        const FriendRequests = await Friendship.find({ reciever: req.user._id }).populate({
            path: "sender",
            select: "firstName lastName username",
        });
        return res.json({
            FriendRequests,
        });
    });
router.post("/accept", async (req, res) => {
    //TO BE DONE LATER
    const { FriendRequestId } = req.body;
    if (!FriendRequestId || FriendRequestId.length !== 24) {
        return res.json({ error: "PLEASE PROVIDE A CORRECT FRIEND Request Id." });
    }
    const friendRequest = await Friendship.findById(FriendRequestId);
    if (!friendRequest) return res.json({ error: "NO SUCH FRIEND REQUEST FOUND" });
    if (friendRequest.reciever != req.user._id)
        return res.status(403).json({
            error: "YOU ARE NOT PERMITTED TO DO THIS",
        });
    friendRequest.status = 1;
    await friendRequest.save();

    const reciever = await User.findById(req.user._id);
    const sender = await User.findById(friendRequest.sender);
    reciever.friends.push(sender);
    sender.friends.push(reciever);
    await reciever.save();
    await sender.save();
    return res.json({
        message: "FRIEND REQUEST ACCEPTS",
    });
});

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    if (!userId || userId.length != 24) return res.json({ error: "Invalid user id" });
    const user = await User.findById(userId).select("firstName lastName username friends email address");
    if (!user) return res.json({ message: "No such user found." });
    const fr = await Friendship.find({
        $or: [
            { sender: req.user._id, reciever: userId },
            { reciever: req.user._id, sender: userId },
        ],
    });
    return res.json({
        user,
        FriendShip: fr,
    });
});

module.exports = router;
// .get((req, res) => {});
