const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const User = require("../models/user.model");
const Token = require("../models/token.model");

const signUp = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw  Error("Credentials not provided");
  }

  const isExistingUserName = await User.findOne({username});
  const isEmailUsed = await User.findOne({email});

  if(isEmailUsed){
    res.status(400);
    throw new Error("User already exist with provided email");
  };
  if(isExistingUserName) {
    res.status(400);
    throw new Error("Username is already taken");
  };



  const newUser = new User();
  newUser.username = username;
  newUser.password = password;
  newUser.email = email;

  await newUser.save();

  res.status(200).json({
    success: true,
    message: "User created successfully",
    data: {
      email,
      username,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const user = await User.findOne({email});

  if(!user){
    res.status(400);
    throw new Error("User not found");
  }

  const isValidPass = await bcrypt.compare(password, user.password);

  if(!isValidPass){
    res.status(400);
    throw new Error("Incorrect password");
  };

  const accessToken = await jwt.sign(
    {_id: user._id, email: user.email},
    process.env.JWT_ACCESS_SECRET,
    {
        expiresIn: process.env.ACCESS_EXPIRATION
    }
  );

  const refreshToken = await jwt.sign(
    {_id: user._id, email: user.email},
    process.env.JWT_REFRESH_SECRET,
    {
        expiresIn: process.env.REFRESH_EXPIRATION
    }
  );

  await Token.create({
    user: user._id,
    token: refreshToken
  })

  res.status(200).json({
    success: true,
    message: "User Login successfull",
    data: {
        accessToken,
        refreshToken
    }
  })
});

const getNewAccessToken = asyncHandler(async(req, res) => {
  const { refreshToken } = req.body;

  if(!refreshToken){
    res.status(400);
    throw new Error("Refresh token not provided");
  }

  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  if(!payload){
    res.status(401);
    res.status("Invalid refresh token");
  }

  const userStillExist = await User.findOne({_id: payload._id});
  
  if(!userStillExist){
    res.status(404);
    throw new Error("No user exists with provided token");
  };
  
  const newAccessToken = jwt.sign({email: payload.email, _id: payload._id},process.env.JWT_ACCESS_SECRET);

  res.status(200).json({
    success: true,
    message: "Successfully retreived accesstoken",
    data: {newAccessToken}
  })
})




module.exports = {
  signUp,
  login,
  getNewAccessToken
};


