const ExerciseModel = require("../models/exercise");
const UserModel = require("../models/user");
const func = require("../functions")


module.exports = function (app) {
  
  
    // to generate a workout:
    // (assuming I already have user preferences)
    app.get("/workouts", async function (req, res) {
      // inputs from the user:
    
      let id = req.query.id;
      let usepreferences = req.query.usepreferences;
      let time, difficulty, musclegroup, type;

      if (id && usepreferences === "yes") {
        let user = await UserModel.findById({ _id: id });
        time = user.preferences.time;
        difficulty = user.preferences.difficulty;
        musclegroup = user.preferences.musclegroup;
        type = user.preferences.type;
      } else if (req.query.time && req.query.musclegroup 
      && req.query.difficulty && req.query.type) {
        time = req.query.time;
        musclegroup = req.query.musclegroup;
        difficulty = req.query.difficulty;
        type = req.query.type; // strength vs tone
      } else {
        res.send(`To use your saved preferences, please enter your user ID and usepreferences: yes. 
        Otherwise, enter time, musclegroup, difficulty and type.`)
      };

      console.log(type, difficulty, musclegroup, time);

      // calculating how many exercises to fetch:
      let numOfEx;
      if (type === "strength") {
        numOfEx = time / 5; // time taken per exercise (5 sets, 5 reps, 45sec breaks, based on 3 sec per rep)
      } else if (type === "tone") {
        numOfEx = time / 3.5; // time taken per exercise (3 sets, 12 reps, 30sec breaks, based on 3 sec per rep)
      } else {
        console.log("Type of workout not valid. Please enter 'strength' or 'tone'.");
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

}

