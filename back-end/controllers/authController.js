const asyncHandler = require("express-async-handler");
const authQuery = require("../models/authQuery");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { body, param, validationResult } = require("express-validator");

// controller for login
exports.postLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email cannot be Empty")
    .isEmail()
    .withMessage("invalid email format")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("password field is empty"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsgArray = errors.array().map((error) => error.msg);
      return res.status(400).json({
        message: "enter proper fields",
        errors: errorMsgArray,
      });
    }
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(404).json({
        message: "empty fields submitted",
      });
    }

    const result = await authQuery.getUserByEmail(email);
    if (result.success === true) {
      const match = await bcrypt.compare(password, result.data.password);
      if (match) {
        const user = result.data;
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        return res.status(200).json({
          message: "authentication successful",
          token,
        });
      } else {
        return res.status(401).json({
          message: "incorrect credential",
        });
      }
    }
    return res.status(404).json({
      message: result.message,
      error: result.error,
    });
  }),
];
// controller for account creation
exports.postCreateAccount = [
  body("name").notEmpty().withMessage("name cannot be empty").trim().escape(),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("email cannot be Empty")
    .trim()
    .isEmail()
    .withMessage("invalid email format")
    .normalizeEmail(),

  body("profilePic").optional().isURL(),

  body("password")
  .notEmpty()
  .withMessage("password cannot be empty")
  .trim(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsgArray = errors.array().map((error) => error.msg);
      return res.status(400).json({
        message: "enter proper fields",
        errors: errorMsgArray,
      });
    }

    const { name, email, profilePic, password } = req.body;

    //   temperory checking for empty fields
    if (!name && !email && !password) {
      return res.status(402).json({
        message: "empty fields submitted",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await authQuery.createUser(
      name,
      profilePic,
      email,
      hashedPassword
    );

    if (result.success === true) {
      return res.status(200).json({
        message: "new author created",
        data: result.data,
      });
    }
    return res.status(400).json({
      message: result.message,
      error: result.error,
    });
  }),
];
