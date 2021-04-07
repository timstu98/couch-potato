const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type:String,required:true},
  password: {type:String,required:true,minlength:8},
  email: String,
  admin: Boolean
});

module.exports = mongoose.model("User", UserSchema);
