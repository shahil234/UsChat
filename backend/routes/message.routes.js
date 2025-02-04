const express = require("express");
const auth = require("../middlewares/authentication");
const { getMessageWithFriend } = require("../controllers/message.controller");

const router = express.Router();

router.get("/:friendId",auth, getMessageWithFriend)

module.exports = router;