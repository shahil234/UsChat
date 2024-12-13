const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  commentAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentContent: {
    type: String, 
    required: true
  }
});


module.exports = mongoose.model("Comment", commentSchema);