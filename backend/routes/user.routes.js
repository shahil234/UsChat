const express = require("express");
const upload = require("../middlewares/multer");
const auth = require("../middlewares/authentication")
const { uploadPfp } = require("../controllers/user.controller");

const router = express.Router();

router.post("/pfp",auth, upload.single("pfp"), uploadPfp)


module.exports = router;