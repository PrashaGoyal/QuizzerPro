const mongoose = require("mongoose");

// defining the teacher schema
const teacherSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  quizIDs: {
    type: [mongoose.ObjectId],
  },
});

// creating the "teachers" model
const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
