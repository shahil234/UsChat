const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const uploadPfp = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.avatar = req.file.path;

  await user.save();
  res.status(200).json({
    success: true,
    message: "Successfully uploaded the profile picture",
  });
});

module.exports = {
  uploadPfp,
};
