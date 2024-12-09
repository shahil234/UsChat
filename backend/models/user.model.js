const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"],
  },
  avatar: {
    type: String,
    default: null
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(this.password, salt);
      this.password = hashedPass;
      next();
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = mongoose.model("User", userSchema);
