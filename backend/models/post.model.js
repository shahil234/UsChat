const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  hearts: {
    type: Number,
    default: 0,
  },
  caption: {
    type: String,
    required: [true, "Caption for a Post is compulsory"],
  },
  pictures: [
    {
      type: String,
      default: null,
    },
  ],
}, {timestamps: true});

module.exports = mongoose.model("Post", postSchema);
