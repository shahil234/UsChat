const express = require("express");
const auth = require('../middlewares/authentication')
const { login, signUp, getNewAccessToken } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup",signUp);
router.post("/login", login);
router.get("/token",getNewAccessToken);


module.exports = router;