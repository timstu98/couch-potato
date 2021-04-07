const UsersModel = require("../models/user");
const func = require ('../functions.js');
const jwt = require("jsonwebtoken");

module.exports = function (app) {

    // Save user preferences
    app.post("/users/preferences", async function (req, res) {
    
      let time = req.query.time;
      let musclegroup = req.query.musclegroup;
      let difficulty = req.query.difficulty;
      let type = req.query.type; 
      
      const authHeader = req.headers.authorization
      const token = authHeader && authHeader.split(' ')[1]
      const decoded = jwt.verify(token, func.JWT_SECRET)
      const id = decoded.username

      if (id) {
        let user = await UsersModel.findByIdAndUpdate({ _id: id }, 
          { preferences: { time: time, musclegroup: musclegroup, difficulty: difficulty, type: type}}, { new: true }, (err, result) => {
            if (err) {
              res.send("Something went wrong when updating the user's preferences!");
            } else {
              res.send(result)
            }
          })
    } else {
      res.send("Please provide your user ID.")
    }})

    // Post request to log in
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

      // Get request for all users
      app.get("/users", func.requireAdmin, async function (req, res) {
        const all = await UsersModel.find();
        try {
          res.json(all);
        } catch (error) {
          res.status(500).send(error);
        }
      }); 
    
      // Get request for specific user
      app.get("/users/:id", func.requireAdmin, async function (req, res) {
        const { id } = req.params;
        const result = await UsersModel.findById(id);
        try {
          res.json(result);
        } catch (error) {
          res.status(500).send(error);
        }
      }); 
    
      // Put request to update specific user
      app.put("/users/:id", func.requireAdmin, async function (req, res) {
        const { id } = req.params;
        const { username, password, email, admin } = req.body;
        try {
           await UsersModel.findByIdAndUpdate({_id: id}, { username: username, password: password, email: email, admin: admin }, { new: true }, (err, doc) => {
            if (err) {
              res.send("Something went wrong when updating the user's data!");
            } else {
              res.send(doc)
          }})
          } catch (error) {
          res.status(500).send(error);
        }
      }); 
    
      // Delete request to remove specific user
      app.delete("/users/:id", func.requireAdmin, async function (req, res) {
          const { id } = req.params;
          try {
            await UsersModel.findOneAndDelete({_id: id},
              function (err, docs) {
                if (err){
                    res.send("Something went wrong, the user has not been deleted.")
                }
                else{
                    res.send(`The user ${docs} has been deleted.`);
                }});
          } catch (error) {
          res.status(500).send(error);
        }
      }); 
    
      // to sign up:
        app.post("/signup", async (req, res) => {
        if (!func.checkForBody(req, res)) return;
        const { username, password, email, admin } = req.body;
        // does username already exist in DB?
        const existingUser = await UsersModel.find({ username });
        if (existingUser.length !== 0) {
          res.send("Username already exists, please use new username or login.");
        } else {
          // create user in DB
          let user = new UsersModel({ username, password, email, admin});
          user.save((err, results) => {
            if (err) {
              console.log(err);
            } else {
              // send access token
              const accessToken = jwt.sign(
                { id: results._id },
                func.JWT_SECRET
              );
              res.json({ accessToken });
            }
          });
        }
      });

    }
    