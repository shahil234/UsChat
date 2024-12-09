const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const Friend = require("../models/friend.model")

const getSuggestions = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user_id } }).select("_id username avatar");

  const suggestions = await Promise.all(
    users.map(async (user) => {
      const isFriend = await Friend.findOne({
        $or: [
          { user: req.user_id, friendsWith: user._id },
          { user: user._id, friendsWith: req.user_id },
        ],
      });

      return {
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
        isFriend: !!isFriend, // Convert to true/false
      };
    })
  );
  

  res.status(200).json({
    success: true,
    message: "Fetched all suggestions",
    data: suggestions
  });
});

module.exports = { getSuggestions };
