const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const Request = require("../models/request.model");
const Friend = require("../models/friend.model");

const sendFriendRequest = asyncHandler(async (req, res) => {
  const { receiverId } = req.body;

  if (!receiverId) {
    res.status(400);
    throw new Error("Please specify the request receiver");
  }

  const reciever = await User.findById(receiverId);

  if (!reciever) {
    res.status(404);
    throw new Error("Invalid reciever id");
  }

  const sender = req.user;

  const isAlreadyFriendsWith = await Friend.findOne({
    user: sender._id,
    friendsWith: receiverId,
  });

  if (isAlreadyFriendsWith) {
    res.status(400);
    throw new Error(`You are already friends with ${reciever.username} `);
  }
  const isRequestSentAlready = await Request.findOne({
    sender: sender._id,
    receiver: receiverId,
  });

  if (isRequestSentAlready) {
    res.status(400);
    throw new Error(`Request already sent to ${reciever.username}`);
  }

  await Request.create({
    sender: sender._id,
    receiver: reciever._id,
  });

  res.status(200).json({
    success: true,
    message: "Successfully sent request",
    data: {
      sender: sender.username,
      reciever: reciever.username,
    },
  });
});

const acceptFriendRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.body;

  const request = await Request.findById(requestId);

  if (!request) {
    res.status(404);
    throw new Error("Invalid Request Id");
  }

  await Friend.create({
    user: request.sender,
    friendsWith: request.receiver,
  });

  res.status(200).json({
    success: true,
    message: `Successfully accepted the request`,
  });
});

const rejectFriendRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.body;

  const request = await Request.findById(requestId);

  if (!request) {
    res.status(404);
    throw new Error("Invalid Request Id");
  }

  await Request.findByIdAndDelete(requestId);

  res.status(200).json({
    success: true,
    message: `Successfully rejected the request`,
  });
});

const getAllRequest = asyncHandler(async (req, res) => {
  const user = req.user;

  const friendRequests = await Request.find({ receiver: user._id });

  if (!friendRequests) {
    res.status(404);
    throw new Error("No request recieved");
  }

  res.status(200).json({
    success: false,
    message: "Successfully fetched friend requests",
    data: friendRequests,
  });
});

module.exports = {
  getAllRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
};
