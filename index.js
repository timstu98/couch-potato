const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const MongoClient = require("mongodb");

const app = express();
const port = 3000;
const URI =
  "mongodb+srv://amelia:cluster44@cluster0.vdpac.mongodb.net/justGoWithFit?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let collection;

//
