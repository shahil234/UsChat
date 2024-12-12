const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const Friend = require("../models/friend.model");
const Request = require("../models/request.model");

const getSuggestions = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).select(
    "_id username avatar email"
  );
  const suggestions = await Promise.all(
    users.map(async (user) => {
      const isFriend = await Friend.findOne({
        $or: [
          { user: req.user._id, friendsWith: user._id },
          { user: user._id, friendsWith: req.user._id },
        ],
      });

      const isRequestReceived = await Request.findOne({
        sender: user._id,
        receiver: req.user._id,
      });

      if (isRequestReceived || isFriend) return;

      const isSentRequest = await Request.findOne({
        receiver: user._id,
        sender: req.user._id,
      });

      return {
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
        isFriend: !!isFriend, // Convert to true/false
        isSentRequest: !!isSentRequest,
      };
    })
  );

  const totalSuggestions = suggestions.filter((item) => item);

  res.status(200).json({
    success: true,
    message: "Fetched all suggestions",
    data: totalSuggestions,
  });
});

module.exports = { getSuggestions };
