const express = require("express");
const teachersController = require("../controllers/teachers.controller");

const router = express.Router();

// route for adding a new teacher in the DB
router.route("/").post(teachersController.createTeacher);

// route for updating the quizIDs of quizzes created by a teacher
router.route("/:teacherUserName").patch(teachersController.addQuiz);

module.exports = router;
