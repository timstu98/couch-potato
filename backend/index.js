require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = 5000;
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.json()); // was bodyParser instead of express, but depreciated
app.use(express.urlencoded({ extended: false })); // was bodyParser instead of express, but depreciated
require("./routes/user-routes.js")(app);
require("./routes/workout-routes.js")(app);

db.once("open", listen); // make sure connection to DB is open before starting server

function listen() {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
