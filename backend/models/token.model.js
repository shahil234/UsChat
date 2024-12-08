const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    token: {
        type: String, 
        default: null,
    }
});

module.exports = mongoose.model("Token", tokenSchema);