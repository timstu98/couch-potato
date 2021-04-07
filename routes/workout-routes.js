const ExerciseModel = require("../models/exercise");
const UserModel = require("../models/user");
const WorkoutModel = require("../models/workout");
const func = require("../functions");
const jwt = require("jsonwebtoken");


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
      res.status(500).json(error);
    }
  });
  // to generate a workout:
  // (assuming I already have user preferences)
  app.get("/workouts", async function (req, res) {
    // inputs from the user:

    let time, difficulty, musclegroup, type;
    let saveWorkout = req.query.saveworkout;

    // Get user's ID from JWT token
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = jwt.verify(token, func.JWT_SECRET)
    const id = decoded.username

    if (
      req.query.time &&
      req.query.musclegroup &&
      req.query.difficulty &&
      req.query.type
    ) {
      time = req.query.time;
      musclegroup = req.query.musclegroup;
      difficulty = req.query.difficulty;
      type = req.query.type;
    } else if (id) {
      let user = await UserModel.findById({ _id: id });
      time = user.preferences.time;
      difficulty = user.preferences.difficulty;
      musclegroup = user.preferences.musclegroup;
      type = user.preferences.type;
    } else {
      res.send(`Please enter time, musclegroup, difficulty and type. 
      Otherwise, your preferences will be used.`);
    }

    // calculating how many exercises to fetch:
    let numOfEx;
    if (type === "strength") {
      numOfEx = time / 5; // time taken per exercise (5 sets, 5 reps, 45sec breaks, based on 3 sec per rep)
    } else if (type === "tone") {
      numOfEx = time / 3.5; // time taken per exercise (3 sets, 12 reps, 30sec breaks, based on 3 sec per rep)
    } else {
      console.log(
        "Type of workout not valid. Please enter 'strength' or 'tone'."
      );
    }

    // fetch appropriate exercises from the db
    let exercises = await ExerciseModel.find({
      musclegroup: musclegroup[0].toUpperCase() + musclegroup.substring(1), // have to make first letter lower case
      difficulty: difficulty[0].toUpperCase() + difficulty.substring(1),
    });

    // select number of random exercises to output
    let indexes = func.randNums(numOfEx, exercises.length);
    let output = [];
    for (let i = 0; i < indexes.length; i++) {
      output.push(exercises[i]);
    }

    // save workouts
    if (saveWorkout === "true") {
      let savedWorkout = new WorkoutModel({ userId: id, exercises: output });
      savedWorkout.save((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Workout saved");
        }
      });
    }

    // output the exercises to the user
    try {
      res.json(output);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get("/workouts/saved", async function (req, res) {
    console.log("Retrieving saved workouts");
    const id = req.query.id;
    let savedWorkouts = await WorkoutModel.find({ userId: id });
    try {
      res.json(savedWorkouts);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};
