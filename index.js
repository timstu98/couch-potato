const express = require("express");
require("dotenv").config();
// const bodyParser = require("body-parser");

const MongoClient = require("mongodb");
const exercise = require("./models/exercise");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const URI =
  "mongodb+srv://amelia:cluster44@cluster0.vdpac.mongodb.net/justGoWithFit?retryWrites=true&w=majority";

mongoose.connect(URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.json()); // was bodyparser instead of express
app.use(express.urlencoded({ extended: false })); // was bodyparser instead of express

let collection;

app.get("/random", (req, res) => {
  // get an exercise from the db
  res.send("Here is your random exercise!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
