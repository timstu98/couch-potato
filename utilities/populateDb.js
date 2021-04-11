#! /usr/bin/env node

console.log(
  "This script populates your database. With your specified database as argument"
);
require("dotenv").config({ path: __dirname + "/../.env" });

// Get arguments passed on command line
const Exercise = require("../models/exercise.js");
const async = require("async");
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let exercises = [];

function deleteExercises() {
  Exercise.collection.drop();
  console.log("Deleted exercises");
}

function createExercise(name, musclegroup, link, difficulty, callback) {
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
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Cat-Cow",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/15/cat-cow/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Halo",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/394/halo/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Lying Chest Fly",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/21/lying-chest-fly/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Medicine Ball Push-ups",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/40/medicine-ball-push-ups/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Single-arm Chest Press",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/338/single-arm-chest-press/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "TRX Suspended Knee Tucks",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/87/trx-reg-suspended-knee-tucks/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "TRX Side-straddle Golf Swings",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/81/trx-reg-side-straddle-golf-swings/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "CKC Parascapular Exercises",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/259/ckc-parascapular-exercises/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Offset Single-arm Chest Press",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/356/offset-single-arm-chest-press/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Bottom-up Press",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/396/bottom-up-press/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Medicine Ball Lunge to Chest Pass",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/264/medicine-ball-lunge-to-chest-pass/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Power Push Down",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/286/power-push-down/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Seated Cable Press",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/165/seated-cable-press/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Seated Chest Press",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/188/seated-chest-press/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Seated Close-Grip Chest Press",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/189/seated-close-grip-chest-press/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Seated Decline Cable Press",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/166/seated-decline-cable-press/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Single-arm Rotational Press",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/339/single-arm-rotational-press/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Stability Ball Push-Up",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/63/stability-ball-push-up/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Spinal Twist with a Push-Pull Movement",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/219/spinal-twist-with-a-push-pull-movement/",
          "Advanced"
        );
      },

      //shoulder
      function (callback) {
        createExercise(
          "Barbell Jammers",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/236/barbell-jammers/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Bent Knee Push-up",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/13/bent-knee-push-up/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Contralateral Limb Raises",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/53/contralateral-limb-raises/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Diagonal Raise",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/371/diagonal-raise/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Front Raise",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/54/front-raise/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "High Plank T-spine Rotation",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/330/high-plank-t-spine-rotation/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Incline Reverse Fly",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/34/incline-reverse-fly/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Lateral Raise",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/26/lateral-raise/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Lunge with Overhead Press",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/143/lunge-with-overhead-press/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Overhead Slams",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/182/overhead-slams/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Overhead Medicine Ball Throws",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/178/overhead-medicine-ball-throws/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Prone Scapular (Shoulder) Stabilization Series - I, Y, T, W, O Formation",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/249/prone-scapular-shoulder-stabilization-series-i-y-t-w-o-formation/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "90 Lat Stretch",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/198/90-lat-stretch/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Bird-dog",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/14/bird-dog/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Childs Pose",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/227/childs-pose/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Chin-ups",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/190/chin-ups/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Cobra Exercise",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/16/cobra/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Downward-facing Dog",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/18/downward-facing-dog/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Front Plank",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/32/front-plank/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Glute Bridge Single Leg Progression",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/145/glute-bridge-single-leg-progression/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Front Squat",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/22/front-squat/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Romanian Deadlift",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/317/romanian-deadlift/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Seated Lat Pulldown",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/158/seated-lat-pulldown/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Shrug",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/72/shrug/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Seated Straddle with Side Reaches",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/215/seated-straddle-with-side-reaches/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Shoulder Packing",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/205/shoulder-packing/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Single Arm Overhead Squat",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/393/single-arm-overhead-squat/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Standing Shrug",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/75/standing-shrug/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Straight Arm Pressdown",
          "Upperbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/334/straight-arm-pressdown/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Standing Triangle Straddle Bends",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/225/standing-triangle-straddle-bends/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Supermans",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/9/supermans/",
          "Beginner"
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
          "TRX Single-arm Chest Press",
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
      // Lowerbody
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

      function (callback) {
        createExercise(
          "Agility Ladder: Lateral Shuffle",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/170/agility-ladder-lateral-shuffle/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Alternate Leg Push-off",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/246/alternate-leg-push-off/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Ankle Flexion",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/23/ankle-flexion/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Lateral Cone Jumps",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/120/lateral-cone-jumps/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Lateral Hurdle Run",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/226/lateral-hurdle-run/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Lateral Zig Zags",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/272/lateral-zig-zags/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Seated Calf Stretch",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/214/seated-calf-stretch/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Seated Toe Touches",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/213/seated-toe-touches/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Single Leg Push-off",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/230/single-leg-push-off/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "BOSU® Lateral Jumps",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/119/bosu-sup-reg-sup-lateral-jumps/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "BOSU® Squat Jumps",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/117/bosu-sup-reg-sup-squat-jumps/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Cycled Split-Squat Jump",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/234/cycled-split-squat-jump/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Forward Lunge",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/8/forward-lunge/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Forward Lunge with Arm Drivers",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/95/forward-lunge-with-arm-drivers/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Glute Activation Lunges",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/96/glute-activation-lunges/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Glute Bridge",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/66/glute-bridge/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Goblet Squat",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/362/goblet-squat/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Hexagon Drill",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/207/hexagon-drill/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Hip Hinge",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/33/hip-hinge/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Hip Rotations (Push-up Position)",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/110/hip-rotations-push-up-position/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Inverted Flyers",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/144/inverted-flyers/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Kneeling Hip-flexor Stretch",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/142/kneeling-hip-flexor-stretch/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Kneeling TA Stretch",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/195/kneeling-ta-stretch/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Modified Hurdler's Stretch",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/273/modified-hurdler-s-stretch/",
          "Beginner"
        );
      },

      function (callback) {
        createExercise(
          "Mountain Climbers",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/258/mountain-climbers/",
          "Advanced"
        );
      },

      function (callback) {
        createExercise(
          "Plank with Knee Drag",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/257/plank-with-knee-drag/",
          "Intermediate"
        );
      },

      function (callback) {
        createExercise(
          "Russian Twist",
          "Lowerbody",
          "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/65/russian-twist/",
          "Advanced"
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

deleteExercises();
createExercises();
