const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise", required: true }],
});

module.exports = mongoose.model("Workout", WorkoutSchema);
