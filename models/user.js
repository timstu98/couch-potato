const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
  email: String,
  admin: Boolean,
  preferences: {
    time: { type: Number },
    musclegroup: {
      type: String,
      enum: ["Upperbody", "Lowerbody", "Core"],
      default: "Upperbody",
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    type: { type: String, enum: ["strength", "tone"] },
  },
});

module.exports = mongoose.model("User", UserSchema);
