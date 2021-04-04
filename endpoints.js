const ExerciseModel = require("./models/exercise");
const UsersModel = require("./models/user");
const jwt = require("jsonwebtoken");

// generating random numbers
function randNums(numOfEx, lengthOfArray) {
  let randNums = [];
  for (let i = 0; i < numOfEx; i++) {
    let rand = Math.floor(Math.random() * lengthOfArray) + 1;
    randNums.push(rand);
  }
  return randNums;
}

// JWT authentication 

const JWT_SECRET = "password123";

const authJWT = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const requireAdmin = (req, res, next) => {
  authJWT(req, res, next);
  if (req.user.admin === true) res.status(401).json("Admins only.");
};

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

module.exports = function (app) {
  // simple get request to test if working:
  app.get("/random", async function (_, res) {
    let e = await ExerciseModel.find({});
    let output = e[Math.floor(Math.random() * e.length) + 1];
    try {
      res.json(output);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // to generate a workout:
  // (assuming I already have user preferences)
  app.get("/workout", async function (req, res) {
    // inputs from the user:
    let time = req.query.time;
    let musclegroup = req.query.musclegroup;
    let difficulty = req.query.difficulty;
    let type = req.query.type; // strength vs tone

    // test output in postman:
    // let output = {
    //   time: time,
    //   muscleGroup: muscleGroup,
    //   level: level,
    //   type: type,
    // };

    // calculating how many exercises to fetch:
    let numOfEx;
    if (type === "strength") {
      numOfEx = time / 5; // time taken per exercise (5 sets, 5 reps, 45sec breaks, based on 3 sec per rep)
    } else if (type === "tone") {
      numOfEx = time / 3.5; // time taken per exercise (3 sets, 12 reps, 30sec breaks, based on 3 sec per rep)
      console.log(
        "Type of workout not valid. Please enter 'strength' or 'tone'."
      );
    }

    // fetch appropriate exercises from the db
    let exercises = await ExerciseModel.find({
      musclegroup: musclegroup[0].toUpperCase() + musclegroup.substring(1), // have to make first letter lower case
      difficulty: difficulty[0].toUpperCase() + difficulty.substring(1),
    });

    let indexes = randNums(numOfEx, exercises.length);

    // select number of random exercises to output
    let output = [];
    for (let i = 0; i < indexes.length; i++) {
      output.push(exercises[i]);
    }

    // output the exercises to the user
    try {
      res.json(output);
    } catch (error) {
      res.status(500).send(error);
    }
  });

    // to login
    app.post("/login", async (req, res) => {
    if (!checkForBody(req, res)) return;
    const { username, password } = req.body;
    const user = await UsersModel.findOne({ username, password });

    if (user) {
      const accessToken = jwt.sign({ username: user.username }, JWT_SECRET);
      res.json({ accessToken });
    } else {
      res.json("Username or password incorrect");
    }
  });

  // Get request for all users
  app.get("/users", requireAdmin, async function (req, res) {
    const all = await UsersModel.find();
    try {
      res.json(all);
    } catch (error) {
      res.status(500).send(error);
    }
  }); 

  // to sign up:
    app.post("/signup", async (req, res) => {
    if (!checkForBody(req, res)) return;
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
            { username: results.username },
            JWT_SECRET
          );
          res.json({ accessToken });
        }
      });
    }
  });

};


