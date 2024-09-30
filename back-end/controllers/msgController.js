const asyncHandler = require("express-async-handler");
const { body, param, validationResult } = require("express-validator");
const msgQuery = require("../models/msgAppQuery");
const userQuery = require("../models/userQuery");

// post create message
exports.createMessage = [
  body("content").notEmpty().isString(),

  body("receiverId").notEmpty(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsgArray = errors.array().map((error) => error.msg);
      return res.status(400).json({
        message: "enter proper fields",
        errors: errorMsgArray,
      });
    }
    const senderId = req.user.id;
    const { content, receiverId } = req.body;

    if (!content && !senderId && !receiverId) {
      return res.status(400).json({
        message: "fields are empty",
      });
    }
    const intSenderId = parseInt(senderId, 10);
    const intReceiverId = parseInt(receiverId, 10);

    const sender = await userQuery.getUSerById(intSenderId);
    const receiver = await userQuery.getUSerById(intReceiverId);

    if (intSenderId === intReceiverId) {
      return res.status(400).json({
        message: "You cannot send a message to yourself",
      });
    }

    if (!sender.success && !receiver.success) {
      return res.status(400).json({
        message: "One or both users do not exist. ",
      });
    }

    const result = await msgQuery.createMessage(
      content,
      intSenderId,
      intReceiverId
    );

    if (result.success === true) {
      return res.status(200).json({
        status: "message sent",
        message: result.message,
      });
    }
    return res.status(400).json({
      status: "message sending failed",
      error: result.error,
    });
  }),
];

// conversation between user's
exports.getConversation = [
  param("receiverId").notEmpty().isString(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsgArray = errors.array().map((error) => error.msg);
      return res.status(400).json({
        message: "enter proper fields",
        errors: errorMsgArray,
      });
    }

    const senderId = req.user.id;
    const { receiverId } = req.params;

    if (!senderId || !receiverId) {
      return res.status(400).json({
        message: "no fields submitted",
      });
    }

    const sender = await userQuery.getUSerById(senderId);
    const receiver = await userQuery.getUSerById(receiverId);

    if (senderId === receiverId) {
      return res.status(400).json({
        message: "You cannot send a message to yourself",
      });
    }

    if (!sender.success && !receiver.success) {
      return res.status(400).json({
        message: "One or both users do not exist. ",
      });
    }

    const result = await msgQuery.msgsBetweenUsers(senderId, receiverId);
    if (result.success === true) {
      return res.status(200).json({
        receiver: receiver.user,
        messages: result.data
      });
    }
    return res.status(404).json({
      message: "error in retrieving messages",
      error: result.error,
    });
  }),
];


// get all conversed user's for single user
exports.getAllConversedUserForUserId = asyncHandler(async (req, res) => {
  const userId  = req.user.id;
  console.log(userId)
  if (!userId) {
    return res.status(400).json({
      message: "no fields sent",
    });
  }
  const result = await msgQuery.getUsersConversedByUserId(userId);
  if (result.success === true) {
    return res.status(200).json(result.data);
  }
  return res.status(400).json({
    message: result.message || "System error ",
    error: error,
  });
});
