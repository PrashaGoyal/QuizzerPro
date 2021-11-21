const mongoose = require("mongoose");

// defining the student schema
const studentSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  quizzes: {
    type: [
      {
        quizID: {
          type: Number,
          required: true,
        },
        attempted: {
          type: Boolean,
          required: true,
        },
        score: {
          type: Number,
          required: true, // '0' when quiz is not attempted
        },
      },
    ],
  },
});

// creating the "students" model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
