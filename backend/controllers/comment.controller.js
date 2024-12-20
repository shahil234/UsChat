const asyncHandler = require("express-async-handler");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const getCommentsOfAPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("No post id provided");
  }

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error("Unable to find the post");
  }

  const comments = await Comment.find({ post: post._id })
    .populate({
      path: "commentAuthor",
      select: "username _id avatar ",
    })
    .select("_id commentAuthor commentContent");

  const commentsData = comments.map(item => {
    const duplicateData = {...item.toObject()};

    duplicateData.isEditable = item.commentAuthor._id.toString() === req.user._id.toString();
    
    return duplicateData;
  });
  res.status(200).json({
    success: true,
    message: "Successfully fetched comments",
    data: [...commentsData],
  });
});

const CommentOnAPost = asyncHandler(async (req, res) => {
  const { comment, postId } = req.body;

  if (!comment || !postId) {
    res.status(400);
    throw new Error("No comment or post id provided");
  }

  const post = await Post.findById(postId);

  if (!post) {
    res.status(400);
    throw new Error("Unable to find the requested Post");
  }

  await Comment.create({
    post: post._id,
    commentAuthor: req.user._id,
    commentContent: comment,
  });

  res.status(200).json({
    success: true,
    message: "Successfully commented on the post",
  });
});

const RemoveCommentOnAPost = asyncHandler(async (req, res) => {
  const { commentId } = req.query;

  if (!commentId) {
    res.status(400);
    throw new Error("No comment id provided");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    res.status(404);
    throw new Error("Unable to find the comment");
  }

  if (req.user._id.toString() !== comment.commentAuthor.toString()) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const result = await comment.deleteOne();
  if (result.deletedCount === 0) {
    res.status(500);
    throw new Error("Failed to delete the comment");
  }

  res.status(200).json({
    success: true,
    message: "Successfully deleted the comment",
  });
});

module.exports = {
  getCommentsOfAPost,
  CommentOnAPost,
  RemoveCommentOnAPost,
};
