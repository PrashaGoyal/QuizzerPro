const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const routes = require("./routes");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// database connection
mongoose.connect(
  "mongodb+srv://admin-prasha:Test-123@quizzerpro-cluster.qkfhm.mongodb.net/QuizzerProDB"
);

// enabling cors
app.use(cors());

// serve files for the React frontend
app.use(express.static(path.resolve(__dirname, "../client/build")));

// routes
app.use("/api", routes);

// requests not handled above return to the React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
  console.log("Server started on port", PORT);
});
