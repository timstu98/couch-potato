var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
  name: String,
  musclegroup: {
    type: String,
    enum: ["Upperbody", "Lowerbody", "Core"],
    default: "Upperbody",
  },
  link: String,
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Intermediate",
  },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
