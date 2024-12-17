const asyncHandler = require("express-async-handler");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const Heart = require("../models/heart.model");
const Friend = require("../models/friend.model");

//also make sure to send no. of hearts , who hearted the post and also the comments
const uploadNewPost = asyncHandler(async (req, res) => {
  const { caption } = req.body;

  if (!req.files) {
    res.status(500);
    throw new Error("Cannot upload a new post");
  }

  const newPost = await Post.create({
    author: req.user._id,
    caption,
  });

  newPost.pictures = [...req.files.map((file) => file.path)];

  await newPost.save();

  res.status(200).json({
    success: true,
    message: "Successfully uploaded a new post",
  });
});

const removePost = asyncHandler(async (req, res) => {
  const { postId } = req.query;

  if (!postId) {
    res.status(400);
    throw new Error("No post id provided");
  }

  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const deletedPost = await Post.findByIdAndDelete(post._id);

  if (!deletedPost) {
    res.status(500);
    throw new Error("Unable delete the post. Try again!");
  }

  res.status(200).json({
    success: true,
    message: "Successfully deleted the post",
  });
});

const getAllPost = asyncHandler(async (req, res) => {
  const allPost = await Post.find({ author: req.user._id }).populate({
    path: "author",
    select: "username _id avatar",
  });

  const organizedPostData = await Promise.all(allPost.map(async (post) => {
    const data = { ...post.toObject() };
    const commentsOnThisPost = await Comment.find({ post: post._id }).populate({
      path: "commentAuthor",
      select: "username _id avatar",
    });

    const peopleLikingThisPost = await Heart.find({ post: post._id }).populate({
      path: "likedBy",
      select: "username _id avatar",
    });

    data.comments = commentsOnThisPost;
    data.commentCount = commentsOnThisPost.length;
    data.likedBy = peopleLikingThisPost;
    return data;
  }));

  console.log(organizedPostData, "response")
  res.status(200).json({
    success: true,
    message: "Successfully fetched the posts",
    data: organizedPostData,
  });
});

const HearAPost = asyncHandler(async (req, res) => {
  const { postId } = req.body;

  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const isAlreadyLiked = await Heart.findOne({
    likedBy: req.user._id,
    post: post._id,
  });

  if (isAlreadyLiked) {
    res.status(401);
    throw new Error("Cannot like a post twice");
  }

  post.hearts = post.hearts + 1;

  await post.save();

  await Heart.create({
    post: post._id,
    likedBy: req.user._id,
  });

  res.status(200).json({
    success: true,
    message: "Successfully liked the post",
  });
});

const UnHeartAPost = asyncHandler(async (req, res) => {
  const { postId } = req.body;

  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const isAlreadyLiked = await Heart.findOne({
    likedBy: req.user._id,
    post: post._id,
  });

  if (!isAlreadyLiked) {
    res.status(401);
    throw new Error("Cannot Unlike the post twice");
  }

  post.hearts = post.hearts === 1 ? 0 : post.hearts - 1;

  await post.save();

  await Heart.findOneAndDelete({
    post: post._id,
    likedBy: req.user._id,
  });

  res.status(200).json({
    success: true,
    message: "Successfully unLiked the post",
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
  const { commentId } = req.body;

  if (!commentId) {
    res.status(400);
    throw new Error("No comment id provided");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    res.status(404);
    throw new Error("Unable to find the comment");
  }

  console.log(req.user._id === comment.commentAuthor);
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

const forYouPage = asyncHandler(async (req, res) => {
  const allFriends = await Friend.find({
    $or: [{ user: req.user._id }, { friendsWith: req.user._id }],
  });

  const friendIds = allFriends.map((friend) => {
    if (req.user._id.toString() === friend.user.toString()) {
      return friend.user.toString();
    } else {
      return friend.friendsWith.toString();
    }
  });

  const allFriendsPost = await Post.find({ author: { $in: friendIds } });
});

module.exports = {
  uploadNewPost,
  removePost,
  getAllPost,
  HearAPost,
  UnHeartAPost,
  CommentOnAPost,
  RemoveCommentOnAPost,
};
