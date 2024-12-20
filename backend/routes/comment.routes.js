const express = require("express");
const { getCommentsOfAPost, CommentOnAPost, RemoveCommentOnAPost } = require("../controllers/comment.controller");
const auth = require("../middlewares/authentication")

const router = express.Router();

router.get("/:id", auth, getCommentsOfAPost);
router.post("/", auth, CommentOnAPost);
router.delete("/", auth, RemoveCommentOnAPost);


module.exports = router;