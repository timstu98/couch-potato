const UsersModel = require("../models/user");
const bcrypt = require("bcrypt");
const func = require("../utilities/functions");
const jwt = require("jsonwebtoken");

module.exports = function (app) {
  console.log("User routes set up");

  // Sign up
  app.post("/signup", async (req, res) => {
    if (!func.checkForBody(req, res)) return;
    const { username, password, email, admin } = req.body;

    // Checks if username already exists in database
    const existingUser = await UsersModel.find({ username });
    if (existingUser.length !== 0) {
      res.json("Username already exists, please use a new username or login.");
    } 
    
    // Check password length is at least 8 digits
    if (password.length < 8) {
      res.json("Password should be at least 8 digits.");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create user in DB 
      let user = new UsersModel({ 
        username, password: hashedPassword, email, admin 
      });
      user.save((err, results) => {
        if (err) {
          res.json(err);
        } else {
          const accessToken = jwt.sign({ id: results._id }, func.JWT_SECRET);
          res.json({ accessToken });
        }
      });
    }
  });

  // Log in 
  app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await UsersModel.findOne({ username: username }).exec();
    if (user == null) {
      return res.status(400).send("Cannot find user.");
    }
    try {
      const verify = await bcrypt.compare(password, user.password);
      if (verify) {
        console.log(`${user.username} has successfully logged in.`)
        const accessToken = jwt.sign({ id: user._id }, func.JWT_SECRET);
        res.json({ accessToken });
      } else {
        res.json("Username or password incorrect. Please try again.");
      }
    } catch {
      res.status(500).send();
    }
  });

  // Save user preferences
  app.post("/users/preferences", async function (req, res) {
    let { time, musclegroup, difficulty, type } = req.body;
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
            console.log(`Preferences have been updated for ${result.username}`)
            res.json(result.preferences);
          }
        }
      );
    }
  });

  // Gets user information
  app.get("/users", async function (req, res) {

    const tokenId = func.getUserID(req); 
    const tokenUser = await UsersModel.find({ _id: tokenId });
    let id = req.query.id;

    // Allow admin to list any users
    if (id !== undefined && tokenUser[0].admin === true) {
      func.getUserDetails(id, req, res);
    // Allow non-admin user to list only own details
    } else if (id === undefined) {
      id = tokenId;
      func.getUserDetails(id, req, res);
    } else {
      res.json("You are not authorized to do this.");
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
    // Non-admin user can only update own details
    } else if (id === undefined) {
      id = tokenId;
      func.updateUserDetails(id, req, res);
    } else {
      res.json("You are not authorized to do this.");
    }
  });

  // Delete user
  app.delete("/users", async function (req, res) {

    const tokenId = func.getUserID(req);
    const tokenUser = await UsersModel.find({ _id: tokenId });
    let id = req.query.id;
    
    // Admin can delete any users
    if (id !== undefined && tokenUser[0].admin === true) {
      func.deleteUserDetails(id, req, res);
    // Non-admin user can only delete own details
    } else if (id === undefined) {
      id = tokenId;
      func.deleteUserDetails(id, req, res);
    } else {
      res.json("You are not authorized to do this.");
    }
  });

  // Gets all users information (admin only)
  app.get("/users/all", func.requireAdmin, async function (req, res) {
    const all = await UsersModel.find();
    try {
      res.json(all);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
