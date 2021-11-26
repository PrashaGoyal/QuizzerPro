const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// enabling cors
app.use(cors());

// routes
app.use("/", routes);

mongoose.connect(
  "mongodb+srv://admin-prasha:Test-123@quizzerpro-cluster.qkfhm.mongodb.net/QuizzerProDB"
);

app.listen(8000, function () {
  console.log("Server started on port 8000.");
});
