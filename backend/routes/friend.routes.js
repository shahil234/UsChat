const express = require("express");
const auth = require("../middlewares/authentication");

const {deleteFriends, getAllFriends} = require("../controllers/friend.controller")

const router = express.Router();

router.use(auth);

router.get("/",getAllFriends);
router.delete("/",deleteFriends)

module.exports = router;