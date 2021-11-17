const mongoose = require("mongoose");

// defining the user schema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Student", "Teacher"],
  },
});

// creating the "users" model
const User = mongoose.model("User", userSchema);

module.exports = User;
