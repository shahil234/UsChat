const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const authentication = asyncHandler(async (req, res, next) => {
  try {
    const authorization =
      req.headers["Authorization"] || req.headers["authorization"];
    const token = authorization.split(" ")[1];

    if (!token) {
      res.status(400);
      throw new Error("No token provided");
    }
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(payload._id);

    if (!user) {
      res.status(400);
      throw new Error("User doesn't exists");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Authentication failed!!",
    });
  }
});

module.exports = authentication;
