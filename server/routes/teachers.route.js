const express = require("express");
const teachersController = require("../controllers/teachers.controller");

const router = express.Router();

// route for adding a new teacher in the DB
router.route("/").post(teachersController.createTeacher);

// route for fetching the details of a teacher
router.route("/:teacherUserName").get(teachersController.getTeacher);

// route for adding the quizID of new quiz created by a teacher
router.route("/:teacherUserName/quizzes").post(teachersController.addQuiz);

// route for deleting the quizID of the quiz deleted by the teacher
router
  .route("/:teacherUserName/quizzes/:quizID")
  .delete(teachersController.deleteQuiz);

module.exports = router;
