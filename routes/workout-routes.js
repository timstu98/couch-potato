const ExerciseModel = require("../models/exercise");
const UserModel = require("../models/user");
const func = require("../functions");
const WorkoutModel = require("../models/workout");

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
  app.get("/workouts", async function (req, res) {
    // inputs from the user:
    let time = req.query.time;
    let musclegroup = req.query.musclegroup;
    let difficulty = req.query.difficulty;
    let type = req.query.type; // strength vs tone
    let save = req.query.save;
    let id = req.query.id; // I need to keep this on this file also

    let saveWorkout = req.query.saveworkout;

    if (save === "yes" && id) {
      let user = await UserModel.findByIdAndUpdate(
        { _id: id },
        {
          preferences: {
            time: time,
            musclegroup: musclegroup,
            difficulty: difficulty,
            type: type,
          },
        },
        { new: true },
        (err) => {
          if (err) {
            res.send("Something went wrong when updating the user's data!");
          }
        }
      );
    }

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

    // save workouts
    if (saveWorkout === "true") {
      let savedWorkout = new WorkoutModel({ userId: id, exercises: output });
      savedWorkout.save((err, results) => {
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
};
