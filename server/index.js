const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/QuizzerProDB");

app.listen(8000, function () {
  console.log("Server started on port 8000.");
});
