const jwt = require("jsonwebtoken");
const UsersModel = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: __dirname + "/../.env" });

function checkForBody(req, res) {
  // null and undefined check
  const body = req.body;
  if (
    body && // checks body exists
    Object.keys(body).length === 0 && // checks there is at least one key
    body.constructor === Object // checks body is an object
  ) {
    res.json("No body supplied");
    return false;
  }
  return true;
}

const JWT_SECRET = process.env.TOKEN_SECRET;

const authJWT = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) res.sendStatus(403);
      req.user = user;
    });
  } else {
    res.status(401).json("Please add an authorisation token.");
  }
};

const requireAdmin = async (req, res, next) => {
  authJWT(req, res, next);
  let user = await UsersModel.findById(req.user.id);
  console.log(user.admin)
  if (user.admin !== true) {
    res.json("Admins only.")
  }
  next();
};

function randNums(numOfEx, lengthOfArray) {
  let randNums = [];
  for (let i = 0; i < numOfEx; i++) {
    let rand = Math.floor(Math.random() * lengthOfArray) + 1;
    randNums.push(rand);
  }
  return randNums;
}

const getUserID = (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded.id;
};

const updateUserDetails = async (id, req, res) => {
  const { username, password, email, admin } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await UsersModel.findByIdAndUpdate(
      { _id: id },
      { username, password: hashedPassword, email, admin, _id: id },
      { new: true },
      (err, results) => {
        if (err) {
          res.json("Something went wrong when updating the user's data!");
        } else {
          res.json(results);
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUserDetails = async (id, req, res) => {
  try {
    await UsersModel.findOneAndDelete({ _id: id }, function (err, result) {
      if (err) {
        res.json("Something went wrong, the user has not been deleted.");
      } else {
        res.json(`The user ${result.username} has been deleted.`);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserDetails = async (id, req, res) => {
  const result = await UsersModel.findById(id).exec();
  try {
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.checkForBody = checkForBody;
exports.JWT_SECRET = JWT_SECRET;
exports.requireAdmin = requireAdmin;
exports.randNums = randNums;
exports.getUserID = getUserID;
exports.updateUserDetails = updateUserDetails;
exports.getUserDetails = getUserDetails;
exports.deleteUserDetails = deleteUserDetails;
