const mongoose = require("mongoose");

const heartModel = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});


module.exports = mongoose.model("Heart", heartModel);