const asyncHandler = require("express-async-handler");
const Messages = require("../models/messages.model");

const getMessageWithFriend = asyncHandler(async (req, res) => {
  const { friendId } = req.params;

  if (!friendId) {
    res.status(400);
    throw new Error("User id of a friend is required");
  }

  const messages = await Messages.find({
    $or: [
      { senderId: req.user._id, recipientId: friendId },
      { recipientId: req.user._id, senderId: friendId },
    ],
  }).select("message senderId _id  createdAt");

  res.status(200).json({
    success: true, 
    message: "Successfully fetched the messages",
    data: [...messages]
  })
});


module.exports = {getMessageWithFriend}
