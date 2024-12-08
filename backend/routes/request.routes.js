const express = require("express");

const auth = require("../middlewares/authentication")

const {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getAllRequest
} = require('../controllers/request.controller')

const router = express.Router();
router.use(auth)

router.get("/", getAllRequest);
router.post("/",sendFriendRequest);
router.delete("/",rejectFriendRequest);
router.patch("/",acceptFriendRequest)

module.exports = router;
