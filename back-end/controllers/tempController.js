const asyncHandler = require("express-async-handler");
const tempQuery = require("../models/tempQueries");


exports.getAllUsers = asyncHandler( async( req, res) => {
    const result = await tempQuery.getAllUserDetails()
    if(result.success === true) {
        return res.status(200).json({
            result
        })
    }
    return res.status(402).json({
        message: result.message,
        error:result.error
    })
})

exports.getAllUsersMsgs = asyncHandler( async( req, res) => {
    const result = await tempQuery.getAllUserDetailsAndMsgs()
    if(result.success === true) {
        return res.status(200).json(result.data)
    }
    return res.status(402).json({
        message: result.message,
        error:result.error
    })
})

exports.getConversationUsers = asyncHandler( async( req, res) => {
    const{senderId, receiverId } = req.body
    if(!senderId && !receiverId){
        return res.status(400).json({
            message: "No fields were founds"
        })
    }
    const result = await tempQuery.msgsBetweenUsers(senderId, receiverId);
    if(result.success === true ) {
        return res.status(200).json(result.data)
    }
    return res.status(400).json({
        message: result.message || "no conversations found",
        error: result.error
    })
})


// get all messages for single users
exports.getAllMsgsOfUserId = asyncHandler(async(req, res) => {
    const { userId } = req.body;
    if(!userId) {
        return res.status(400).json({
            message: "no fields sent"
        })
    }
    const result = await tempQuery.getAllMsgsByUserId( userId);
    if(result.success ===  true){
        return res.status(200).json(result.data)
    }
    return res.status(400).json({
        message: result.message || "System error ",
        error: error
    })
})


// get all conversed user's for single users
exports.getAllConversedUserForUserId = asyncHandler(async(req, res) => {
    const { userId } = req.body;
    if(!userId) {
        return res.status(400).json({
            message: "no fields sent"
        })
    }
    const result = await tempQuery.getUsersConversedByUserId( userId);
    if(result.success ===  true){
        return res.status(200).json(result.data)
    }
    return res.status(400).json({
        message: result.message || "System error ",
        error: error
    })
})