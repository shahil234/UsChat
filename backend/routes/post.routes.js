const express = require("express");
const auth = require("../middlewares/authentication");

const {
  uploadNewPost,
  getAllPost,
  UnHeartAPost,
  HearAPost,
  CommentOnAPost,
  RemoveCommentOnAPost,
  removePost
} = require("../controllers/post.controller");
const upload = require("../middlewares/multer");

const router = express.Router();

router.get("/", auth, getAllPost);
router.post("/heart", auth, HearAPost);
router.post("/comment", auth, CommentOnAPost);
router.post("/", auth, upload.array("photos", 4), uploadNewPost);
router.delete("/unheart", auth, UnHeartAPost);
router.delete("/comment", auth, RemoveCommentOnAPost);
router.delete("/",auth, removePost);


module.exports = router;
