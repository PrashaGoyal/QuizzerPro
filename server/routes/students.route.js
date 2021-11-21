const express = require("express");
const studentsController = require("../controllers/students.controller");

const router = express.Router();

// route for adding a new student in the DB
router.route("/").post(studentsController.createStudent);

// route for adding the quizID of the quiz assigned to the student
router.route("/:studentUserName/quizzes").post(studentsController.addQuiz);

router
  .route("/:studentUserName/quizzes/:quizID")

  // route for deleting the quizID of the quiz revoked for the student
  .delete(studentsController.deleteQuiz)

  // route for updating the quiz details of the quiz attempted by the student
  .patch(studentsController.updateQuiz);

module.exports = router;
