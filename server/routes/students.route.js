const express = require("express");
const studentsController = require("../controllers/students.controller");

const router = express.Router();

router
  .route("/")
  // route for fetching the details of all the students
  .get(studentsController.getAllStudents)

  // route for adding a new student in the DB
  .post(studentsController.createStudent);

// route for adding the quizID of the quiz assigned to the student
router.route("/:studentUserName/quizzes").post(studentsController.addQuiz);

router
  .route("/:studentUserName/quizzes/:quizID")

  // route for deleting the quizID of the quiz revoked for the student
  .delete(studentsController.deleteQuiz)

  // route for updating the quiz details of the quiz attempted by the student
  .patch(studentsController.updateQuiz);

module.exports = router;
