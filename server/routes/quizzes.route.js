const express = require("express");
const quizzesController = require("../controllers/quizzes.controller");

const router = express.Router();

// route for creating a new quiz
router.route("/").post(quizzesController.createQuiz);

router
  .route("/:quizID")

  // route for fetching the details of a quiz
  .get(quizzesController.getQuiz)

  // route for updating the quiz details
  .patch(quizzesController.updateQuiz)

  // route for deleting a quiz
  .delete(quizzesController.deleteQuiz);

// route for adding an assignee to the quiz
router.route("/:quizID/assignees/").post(quizzesController.addAssignee);

// route for removing an assignee from the quiz
router
  .route("/:quizID/assignees/:assigneeUserName")
  .delete(quizzesController.removeAssignee);

module.exports = router;
