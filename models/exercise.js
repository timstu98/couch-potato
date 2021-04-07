const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: String,
  musclegroup: {
    type: String,
    required:true,
    enum: ["Upperbody", "Lowerbody", "Core"],
    default: "Upperbody",
  },
  link: String,
  difficulty: {
    type: String,
    required:true,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Intermediate",
  },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);