#! /usr/bin/env node

console.log(
  "This script populates your database. With your specified database as argument"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

const Exercise = require("./models/exercise.js");
const User = require("./models/user.js");
const Workout = require("./models/workout");
const async = require("async");

const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://amelia:cluster44@cluster0.vdpac.mongodb.net/justgowithfit?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let exercises = [];

function createExercise(name, musclegroup, link, difficulty, cb) {
  let exerciseDetail = { name, musclegroup, link, difficulty };

  let exercise = new Exercise(exerciseDetail);

  exercise.save((err, results) => {
    if (err) {
      return err;
    }
    console.log("New exercise: " + exercise);
    exercises.push(exercise);
    return exercise;
  });
}

function createExercises() {
  async.parallel(
    [
      //upperbody
      function (callback) {
        createExercise(
          "Hammer Curl",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/10/hammer-curl/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Bent-Over Row",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/12/bent-over-row/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Seated High Back Rows",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/169/seated-high-back-rows/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Seated Row",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/168/seated-row/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Standing Chest Fly",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/160/standing-chest-fly/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Triceps Pushdowns",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/185/triceps-pushdowns/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Inchworms",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/254/inchworms/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Triceps Extension",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/74/triceps-extension/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Chest Press",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/19/chest-press/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Plank Ups",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/320/plank-ups/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Tricep Pressdown Exercise",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/333/tricep-pressdown/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Lying Barbell Triceps Extensions",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/36/lying-barbell-triceps-extensions/",
          "Intermediate"
        );
      },
      //core-beginner
      function (callback) {
        createExercise(
          "Side Plank - modified",
          "Core",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/100/side-plank-modified/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Dirty Dog",
          "Core",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/109/dirty-dog/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Upward Facing Dog",
          "Core",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/244/upward-facing-dog/",
          "Beginner"
        );
      },
      //core-intermediate
      function (callback) {
        createExercise(
          "Standing Trunk Rotation",
          "Core",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/102/standing-trunk-rotation/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Standing Hip Adduction",
          "Core",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/104/standing-hip-adduction/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Vertical Toe Touches",
          "Core",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/243/vertical-toe-touches/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Reverse Ab Crunch",
          "Core",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/76/reverse-crunch/",
          "Intermediate"
        );
      },

      //core-advanced

      function (callback) {
        createExercise(
          "TRX Front Rollout",
          "Core",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/79/trx-reg-front-rollout/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Single-arm Chest Press",
          "Core",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/91/trx-reg-single-arm-chest-press/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Standing Hay Baler",
          "Core",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/105/standing-hay-baler/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Squats",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/135/bodyweight-squat/",
          "Beginner"
        );
      },
      function (callback) {
        createExercise(
          "Box-jumps",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/115/box-jumps/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Calf raises",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/294/calf-raise/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Single Leg Squat",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/136/single-leg-squat/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Inverted Flyer",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/144/inverted-flyers/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Sumo Rotational Squats",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/129/sumo-rotational-squats/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Lateral Jumps",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/119/bosu-sup-reg-sup-lateral-jumps/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Lunge with Overhead Press",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/143/lunge-with-overhead-press/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Lying Hamstrings Curl",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/131/prone-lying-hamstrings-curl/",
          "Beginner"
        );
      },
    ],

    (err, results) => {
      if (err) {
        console.log("FINAL ERR:" + err);
      } else {
        console.log("Workouts created" + results);
      }
      mongoose.connection.close();
    }
  );
}

createExercises();
