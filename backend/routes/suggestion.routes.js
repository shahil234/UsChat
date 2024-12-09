const express = require("express");
const auth = require("../middlewares/authentication");

const { getSuggestions } = require("../controllers/suggestion.controller");

const router = express.Router();

router.get("/", auth, getSuggestions);

module.exports = router;