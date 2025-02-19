const asyncHandler = require("express-async-handler");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const Heart = require("../models/heart.model");
const Friend = require("../models/friend.model");
const User = require("../models/user.model");

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

  const organizedPostData = await Promise.all(
    allPost.map(async (post) => {
      const data = { ...post.toObject() };
      const commentCounts = await Comment.countDocuments({
        post: data._id,
      })

      const isLiked = await Heart.findOne({
        post: data._id,
        likedBy: req.user._id,
      });

      const peopleLikingThisPost = await Heart.find({
        post: post._id,
      }).populate({
        path: "likedBy",
        select: "username _id avatar",
      });

      data.commentCount = commentCounts;
      data.likedBy = peopleLikingThisPost;
      data.isLiked = !!isLiked;
      return data;
    })
  );

  res.status(200).json({
    success: true,
    message: "Successfully fetched the posts",
    data: organizedPostData,
  });
});

const getOthersPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const allPost = await Post.find({ author: user._id }).populate({
    path: "author",
    select: "username _id avatar",
  });

  const organizedPostData = await Promise.all(
    allPost.map(async (post) => {
      const data = { ...post.toObject() };
      const commentsOnThisPost = await Comment.find({
        post: post._id,
      }).populate({
        path: "commentAuthor",
        select: "username _id avatar",
      });

      const isLiked = await Heart.findOne({
        post: data._id,
        likedBy: req.user._id,
      });

      const peopleLikingThisPost = await Heart.find({
        post: post._id,
      }).populate({
        path: "likedBy",
        select: "username _id avatar",
      });

      data.comments = commentsOnThisPost;
      data.commentCount = commentsOnThisPost.length;
      data.likedBy = peopleLikingThisPost;
      data.isLiked = !!isLiked;
      return data;
    })
  );

  res.status(200).json({
    success: true,
    message: "Successfully fetched the posts",
    data: organizedPostData,
  });
});

const HearAPost = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  console.log(postId);
  const post = await Post.findById(postId);
  console.log("hello", post);

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
  const { postId } = req.query;

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



module.exports = {
  uploadNewPost,
  removePost,
  getAllPost,
  getOthersPost,
  HearAPost,
  UnHeartAPost
};
