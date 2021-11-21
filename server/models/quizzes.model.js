const mongoose = require("mongoose");

// defining the quiz schema
const quizSchema = new mongoose.Schema({
  quizName: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  questions: {
    type: [
      {
        questionType: {
          type: String,
          required: true,
          enum: ["radio", "checkbox"],
        },
        questionTitle: {
          type: String,
          required: true,
        },
        options: {
          type: [
            {
              optionContent: {
                type: String,
                required: true,
              },
              isCorrect: {
                type: Boolean,
                required: true,
              },
            },
          ],
          required: true,
        },
        marks: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  assignedTo: {
    type: [String],
  },
});

// creating the "quizzes" model
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
