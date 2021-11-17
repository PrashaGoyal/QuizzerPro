const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello");
});

app.listen(8000, function () {
  console.log("Server started on port 8000.");
});
