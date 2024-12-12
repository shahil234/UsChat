const asyncHandler = require("express-async-handler");

const Friend = require("../models/friend.model");

const getAllFriends = asyncHandler(async (req, res) => {
  const user = req.user;

  const allFriends = await Friend.find({
    $or: [{ user: user._id }, { friendsWith: user._id }],
  })
    .populate({
      path: "user",
      select: "_id username avatar",
    })
    .populate({
      path: "friendsWith",
      select: "_id username avatar",
    });

  const formatedFriends = allFriends.map((item) => {
    if (String(item.friendsWith._id) == String(user._id)) {
      return {
        userId: item.user._id,
        username: item.user.username,
        avatar: item.user.avatar,
      };
    } else {
      return {
        userId: item.friendsWith._id,
        username: item.friendsWith.username,
        avatar: item.friendsWith.avatar,
      };
    }
  });

  res.status(200).json({
    success: true,
    message: "Successfully fetched friends",
    data: formatedFriends,
  });
});

const deleteFriends = asyncHandler(async (req, res) => {
  const { friendUserId } = req.query;

  if (!friendUserId) {
    res.status(400);
    throw new Error("User id of a friend not provided");
  }

  const friend = await Friend.findOneAndDelete({
    $or: [
      { user: req.user._id, friendsWith: friendUserId },
      { user: friendUserId, friendsWith: req.user._id },
    ],
  });

  if (!friend) {
    res.status(404);
    throw new Error("No relation found with provided user");
  }

  res.status(200).json({
    success: true,
    message: "Unfriend the user",
  });
});

module.exports = {
  getAllFriends,
  deleteFriends,
};
