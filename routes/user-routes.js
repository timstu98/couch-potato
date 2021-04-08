const UsersModel = require("../models/user");
const bcrypt = require("bcrypt");
const func = require("../utilities/functions.js");
const jwt = require("jsonwebtoken");

module.exports = function (app) {
  console.log("User routes set up");
  // to sign up:
  app.post("/signup", async (req, res) => {
    if (!func.checkForBody(req, res)) return;
    const { username, password, email, admin } = req.body;
    // does username already exist in DB?
    const existingUser = await UsersModel.find({ username });
    if (existingUser.length !== 0) {
      res.json("Username already exists, please use a new username or login.");
    } //check password length
    if (password.length < 8) {
      res.json("Password should be at least 8 digits.");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      //check password length

      // create user in DB
      let user = new UsersModel({
        username,
        password: hashedPassword,
        email,
        admin,
      });
      user.save((err, results) => {
        if (err) {
          res.json(err);
        } else {
          // send access token
          const accessToken = jwt.sign({ id: results._id }, func.JWT_SECRET);
          res.json({ accessToken });
        }
      });
    }
  });

  // to log in:
  app.post("/login", async (req, res) => {
    if (!func.checkForBody(req, res)) return;
    const { username, password } = req.body;
    const user = await UsersModel.findOne({ username, password });

    if (user) {
      const accessToken = jwt.sign({ id: user._id }, func.JWT_SECRET);
      res.json({ accessToken });
    } else {
      res.json("Username or password incorrect.acefitness");
    }
  });

  //password encryption
  app.post("/logins", async (req, res) => {
    const user = await UsersModel.findOne({
      username: req.body.username,
    }).exec();
    if (user == null) {
      return res.status(400).send("Cannot find user.");
    }
    try {
      const verify = await bcrypt.compare(req.body.password, user.password);
      console.log("This is" + verify);
      if (verify) {
        res.json("Success!");
      } else {
        res.json("Try again.");
      }
    } catch {
      res.status(500).send();
    }
  });

  // Save user preferences
  app.post("/users/preferences", async function (req, res) {
    let { time, musclegroup, difficulty, type } = req.query;
    const id = func.getUserID(req);

    // inputs from the user:
    if (id) {
      let user = await UsersModel.findByIdAndUpdate(
        { _id: id },
        {
          preferences: {
            time,
            musclegroup,
            difficulty,
            type,
          },
        },
        { new: true },
        (err, result) => {
          if (err) {
            res.json(
              "Something went wrong when adding the user's preferences."
            );
          } else {
            res.json(result);
          }
        }
      );
    }
  });

  // Gets user information
  app.get("/users", async function (req, res) {
    const tokenId = func.getUserID(req); // gets user id from token
    const tokenUser = await UsersModel.find({ _id: tokenId });
    let id = req.query.id;

    // Allow admin to list any users
    if (id !== undefined && tokenUser[0].admin === true) {
      func.getUserDetails(id, req, res);
      // Allow non-admin user to list own details
    } else if (id === undefined) {
      id = tokenId;
      func.getUserDetails(id, req, res);
    } else {
      res.json("You are not authorized to do this");
    }
  });

  // Edit user information
  app.put("/users", async function (req, res) {
    const tokenId = func.getUserID(req);
    const tokenUser = await UsersModel.find({ _id: tokenId });
    let id = req.query.id;

    // Allow admin to update any users
    if (id !== undefined && tokenUser[0].admin === true) {
      func.updateUserDetails(id, req, res);
      // Allow non-admin user to update own details
    } else if (id === undefined) {
      id = tokenId;
      func.updateUserDetails(id, req, res);
    } else {
      res.json("You are not authorized to do this");
    }
  });

  // Allow admin to delete any users
  app.delete("/users", async function (req, res) {
    if (id !== undefined && tokenUser[0].admin === true) {
      func.deleteUserDetails(id, req, res);
      // Allow non-admin user to delete own details
    } else if (id === undefined) {
      id = tokenId;
      func.deleteUserDetails(id, req, res);
    } else {
      res.json("You are not authorized to do this.");
    }
  });

  // Gets all users information
  app.get("/users/all", func.requireAdmin, async function (req, res) {
    const all = await UsersModel.find();
    try {
      res.json(all);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
