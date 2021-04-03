const ExerciseModel = require("./models/exercise");
const UsersModel = require("./models/user");

// generating random numbers
function randNums(numOfEx, lengthOfArray) {
  let randNums = [];
  for (let i = 0; i < numOfEx; i++) {
    let rand = Math.floor(Math.random() * lengthOfArray) + 1;
    randNums.push(rand);
  }
  return randNums;
}

// making an auth token? (copied from Irene's notes):
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

module.exports = function (app) {
  // simple get request to test if working:
  app.get("/random", async function (req, res) {
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
    if ((type = "strength")) {
      numOfEx = time / 5; // time taken per exercise (5 sets, 5 reps, 45sec breaks, based on 3 sec per rep)
    } else if ((type = "tone")) {
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
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = UsersModel.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      const accessToken = jwt.sign(
        { username: user.username, role: user.role },
        JWT_SECRET
      );
      res.send({ accessToken });
    } else {
      res.send("Username or password incorrect");
    }
  });

  // to sign up:
  app.post("/signup", async (req, res) => {
    const body = req.body;
    if (
      body && // 👈 null and undefined check
      Object.keys(body).length === 0 &&
      body.constructor === Object
    ) {
      res.send("no body supplied");
      return;
    }
    // get username and password from req.body
    const { username, password, email } = body;
    // console.log(body);
    // does username already exist in DB?
    const existingUser = await UsersModel.find((u) => {
      if (u) {
        return u.username === username;
      }
      return false;
    });

    console.log(existingUser);
    if (existingUser.length != 0) {
      res.send("Username already exists, please use new username or login.");
    } else {
      // create user in DB
      let user = new UsersModel({ username, password, email });
      let output = user.save((err, results) => {
        if (err) {
          return err;
        }
        console.log(user);
        return user;
      });
      res.send(output);
    }
    // create jwt token
    // send token back
  });
};
