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
        questionType: {
          type: String,
          required: true,
          enum: ["radio", "checkbox"],
        },
      },
    ],
  },
  assignedTo: {
    type: [mongoose.ObjectId],
  },
});

// creating the "quizzes" model
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
