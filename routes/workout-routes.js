const ExerciseModel = require("../models/exercise");
const UserModel = require("../models/user");
const WorkoutModel = require("../models/workout");
const func = require("../utilities/functions");

module.exports = function (app) {
  console.log("Workout routes set up");

  app.get("/workouts/random", async function (_, res) {
    let e = await ExerciseModel.find({});
    let output = e[Math.floor(Math.random() * e.length) + 1];
    try {
      res.json(output);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.get("/workouts", async function (req, res) {
    let time, difficulty, musclegroup, type;
    let saveWorkout = req.query.saveworkout;

    const id = func.getUserID(req);

    if (req.query.time && req.query.musclegroup && req.query.difficulty && req.query.type) {
      console.log("A workout will be generated using specified preferences.")
      time = req.query.time;
      musclegroup = req.query.musclegroup;
      difficulty = req.query.difficulty;
      type = req.query.type;
    } else if (id) {
      console.log("A workout will be generated using saved preferences.")
      let user = await UserModel.findById({ _id: id });
      time = user.preferences.time;
      difficulty = user.preferences.difficulty;
      musclegroup = user.preferences.musclegroup;
      type = user.preferences.type;
    } else {
      res.json(`Please specify time, musclegroup, difficulty and type. 
      Otherwise, your saved preferences will be used.`);
    }

    // Calculate number of exercises
    let numOfEx;
    if (type === "strength") {
      numOfEx = time / 5; // Time taken per exercise (5 sets, 5 reps, 45sec breaks, based on 3 sec per rep)
    } else if (type === "tone") {
      numOfEx = time / 3.5; // time taken per exercise (3 sets, 12 reps, 30sec breaks, based on 3 sec per rep)
    } else {
      res.json("Type of workout not valid. Please enter 'strength' or 'tone'.");
    }

    // Fetch appropriate exercises from the database
    let exercises = await ExerciseModel.find({
      musclegroup: musclegroup[0].toUpperCase() + musclegroup.substring(1), 
      difficulty: difficulty[0].toUpperCase() + difficulty.substring(1),
    });

    // Select appropriate number of random exercises
    let indexes = func.randNums(numOfEx, exercises.length);
    let output = [];
    for (let i = 0; i < indexes.length; i++) {
      output.push(exercises[indexes[i]]);
    }

    // Save workouts
    if (saveWorkout === "true") {
      let savedWorkout = new WorkoutModel({ userId: id, exercises: output });
      savedWorkout.save((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Workout saved.");
        }
      });
    }

    try {
      res.json(output);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get("/workouts/saved", async function (req, res) {
    const id = func.getUserID(req);
    let savedWorkouts = await WorkoutModel.find({ userId: id }).populate("exercises");
    try {
      res.json(savedWorkouts);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};
