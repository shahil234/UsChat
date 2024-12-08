const asyncHandler = require("express-async-handler");

const Friend = require("../models/friend.model")

const getAllFriends = asyncHandler(async(req,res) => {
    const user = req.user;

    const allFriends = await Friend.find({
        $or: [
            {user: user._id},
            {friendsWith: user._id}
        ]
    });

    if(!allFriends){
        res.status(404);
        throw new Error("You have no friends");
    }

    res.status(200).json({
        success: true, 
        message: "Successfully fetched friends",
        data: allFriends
    })
});

const deleteFriends = asyncHandler(async(req, res) => {
    const { friendDocId } = req.body;
    await Friend.findByIdAndDelete(friendDocId);
    res.status(200).json({
        success: true,
        message: `Successfully unfriended a user `
    });
});


module.exports = {
    getAllFriends,
    deleteFriends
}