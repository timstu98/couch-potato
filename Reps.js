#! /usr/bin/env node

// Isn't this just an unfinished  copy of populateDb.js? Can it be deleted?

console.log('This script populates your database. With your specified database as argument');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

const Exercise=  require('./models/exercise.js');
const User = require('./models/user.js');
const Workout = require('./models/workout');



var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var exercises = []


function createExercise(name, musclegroup, link, difficulty, cb) {
    let exerciseDetail = {name, musclegroup, link, difficulty}

    let exercise = new Exercise(exerciseDetail)

    exercise.save((err, results) => {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New exercise: ' + exercise)
        exercises.push(exercise)
        cb(null,exercise)

    });

}


function(callback) {
    createExercise('b')
}
