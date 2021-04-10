var User = require("../models/userModel");
const { body, validator } = require("express-validator");
const { validationResult } = require("express-validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { sanitizeBody } = require("express-validator/filter");
const { log } = require("async");

// Sign in validation
const signup_user_post = [
  body("username", "Username must not be empty.")
    .isLength({ min: 1 }).trim(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),

  // Sanitize username field
  sanitizeBody("username").escape(),

  (req, res) => {
    // Extract validation errors from request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send("Data failed validation.");
    }
  },
];

const login_user_post = [
  passport.authenticate("local", { session: false }),
  function (req, res) {
    const token = jwt.sign({ id: req.user._id.toJSON() }, process.env.SECRET, {
      expiresIn: "1h",
    });
    res.json({
      success: true,
      token: "Bearer" + token,
      user: {
        id: req.user._id,
        username: req.user.username,
      },
      secret: "shhh",
    });
  },
];

exports.login_user_post = login_user_post;
exports.signup_user_post = signup_user_post;
