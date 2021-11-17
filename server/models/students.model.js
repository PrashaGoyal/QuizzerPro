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
          type: mongoose.ObjectId,
          required: true,
        },
        attempted: {
          type: Boolean,
          required: true,
        },
        score: {
          type: Number,
        },
      },
    ],
  },
});

// creating the "students" model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
