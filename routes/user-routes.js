const UsersModel = require("../models/user");
const bcrypt = require("bcrypt");

const func = require("../functions.js");
const jwt = require("jsonwebtoken");

module.exports = function (app) {

  //password encryption
  app.post("/logins", async (req, res) => {
  const user =  await UsersModel.findOne({username: req.body.username}).exec()
  console.log(user)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  } try {
    const verify = await bcrypt.compare(req.body.password, user.password) 
console.log("This is" + verify)
if (verify) {
res.send('Success')
   } else {
     res.send('Try again')
   }
} catch {
res.status(500).send()
  }
  
})
  // Save user preferences
  app.post("/users/preferences", async function (req, res) {
    let { time, musclegroup, difficulty, type } = req.query;

    console.log(req.query);
    const id = func.getUserID(req);
    console.log(id);

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
            res.send(
              "Something went wrong when adding the user's preferences."
            );
          } else {
            res.send(result);
          }
        }
      );
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
      res.json("Username or password incorrect");
    }
  });

  // to sign up:
  app.post("/signup", async (req, res) => {
    console.log(req.body);
    if (!func.checkForBody(req, res)) return;
    const { username, password, email, admin } = req.body;
    // does username already exist in DB?
    const existingUser = await UsersModel.find({ username });
    if (existingUser.length !== 0) {
      res.send("Username already exists, please use new username or login.");
    } //check password length
    if (password.length < 8) {
      res.send("Password shall be at least 8 digits.");
    } else {
          const hashedPassword = await bcrypt.hash(req.body.password, 10)
    //check password length
      // create user in DB
      let user = new UsersModel({ username, password:hashedPassword, email, admin });
      user.save((err, results) => {
        if (err) {
          console.log(err);
          res.send(err);
        }   else {
          // send access token
          const accessToken = jwt.sign({ id: results._id }, func.JWT_SECRET);
          res.json({ accessToken });
        }
      });
    }
  });


  //  get user details
  app.get("/users", async function (req, res) {
    const id = func.getUserID(req);
    console.log(id);
    func.getUserDetails(id, req, res);
  });

  // edit user details
  app.put("/users", async function (req, res) {
    const id = func.getUserID(req);
    console.log(id);
    func.updateUserDetails(id, req, res);
  });

  // delete user details
  app.delete("/users", async function (req, res) {
    const id = func.getUserID(req);
    func.deleteUserDetails(id, req, res);
  });
};
