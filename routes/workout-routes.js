const ExerciseModel = require("../models/exercise");
const UserModel = require("../models/user")
const func = require("../functions")

module.exports = function (app) {
   
    app.get("/workout", async function (req, res) {
    
      let time = req.query.time;
      let musclegroup = req.query.musclegroup;
      let difficulty = req.query.difficulty;
      let type = req.query.type;
      let id = req.query.id;
      let save = req.query.save;
  
      // could be better to decode the JWT token to get the ID 
      // but i'm not sure how to get that from the post request header

      if (save === "yes" && id) {
      let user = await UserModel.findByIdAndUpdate(
            {_id: id}, 
            {preferences: { time: time, 
                            musclegroup: musclegroup, 
                            difficulty: difficulty, 
                            type: type}}, 
            function(err) {
              if (err) {
                res.send(err);
              }});
      }
          
      // calculating how many exercises to fetch:
      let numOfEx;
      if (type === "strength") {
        numOfEx = time / 5; // time taken per exercise (5 sets, 5 reps, 45sec breaks, based on 3 sec per rep)
      } else if (type === "tone") {
        numOfEx = time / 3.5; // time taken per exercise (3 sets, 12 reps, 30sec breaks, based on 3 sec per rep)
      } else {
        console.log(
        "Type of workout not valid. Please enter 'strength' or 'tone'.");
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



