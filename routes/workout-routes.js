const ExerciseModel = require("../models/exercise");
const func = require("../functions");

module.exports = function (app) {
  console.log("routes setup");
  // I think this is useful for us, but also for the API user, to test endpoints
  // please leave for now
  app.get("/workouts/random", async function (_, res) {
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
  app.get("/workouts", async function (req, res) {
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

    let indexes = func.randNums(numOfEx, exercises.length);

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

  // saving workouts
  app.post("/workouts", async (req, res) => {
    // This is obviously a draft, please ignore
    // if (!func.checkForBody(req, res)) return;
    // const { username, password, email, admin } = req.body;
    // // does username already exist in DB?
    // const existingUser = await UsersModel.find({ username });
    // if (existingUser.length !== 0) {
    //   res.send("Username already exists, please use new username or login.");
    // } else {
    //   // create user in DB
    //   let user = new UsersModel({ username, password, email, admin });
    //   user.save((err, results) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       // send access token
    //       const accessToken = jwt.sign(
    //         { username: results.username },
    //         func.JWT_SECRET
    //       );
    //       res.json({ accessToken });
    //     }
    //   });
    // }
  });
};
