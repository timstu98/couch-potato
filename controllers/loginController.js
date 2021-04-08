
var User = require('../models/userModel');
const {body,validator} = require('express-validator');
const {validationResult} = require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const commentsModel = require('../models/commentsModel');
const {sanitizeBody} = require('express-validator/filter');


exports.signup_user_post = [
  // Validate fields.
  body("username", "username must not be empty.").isLength({ min: 1 }).trim(),
  // password must be at least 8 chars long
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 chars long"),

  //Sanitize fields.
  sanitizeBody("username").escape(),

  (req, res) => {
    //Extract validation errors from request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send('data failed validation')
    } 

  }]

exports.login_user_post = [
    passport.authenticate('local', {session: false}),
    function (req, res) {
      const token = jwt.sign({id: req.user._id.toJSON()}, process.env.SECRET, {expiresIn: '1h'});
      res.json({
        success: true,
        token: 'Bearer' + token,
        user: {
          id: req.user._id,
          username: req.user.username
        },
        secret: 'shhh'
        })

    }
]

