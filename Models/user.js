var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model("User", UserSchema);
