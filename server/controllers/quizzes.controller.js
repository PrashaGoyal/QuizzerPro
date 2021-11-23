const Quiz = require("../models/quizzes.model");

// importing the axios package
const axios = require("axios");

// operations performed on the "quizzes" model

// to create a new quiz with only the "quizName" and the "author"
function createQuiz(req, res) {
  const newQuiz = {
    ...req.body,
    questions: [],
    assignedTo: [],
  };

  // validation for empty quizName field
  if (!newQuiz.quizName)
    res
      .status(200)
      .send({ success: false, message: "Quiz should have a name." });
  // if the field is not empty
  else {
    Quiz.create(newQuiz, function (err, createdQuiz) {
      if (err) {
        if (err.code === 11000)
          res.status(200).send({
            success: false,
            message:
              "A quiz with this name already exists. Please choose a different name.",
          });
        else res.status(200).send({ success: false, message: err });
      } else {
        // if the quiz is successfully created, add the quizID to the author's document
        addQuizToAuthor(req, res, createdQuiz._id);

        // success status if nothing goes wrong
        res.status(200).send({
          success: true,
          message: "Successfully created the quiz.",
          quiz: createdQuiz,
        });
      }
    });
  }
}

// to add the quiz created to the author's document
function addQuizToAuthor(req, res, createdQuizID) {
  axios
    .post(`http://localhost:8000/teachers/${req.body.author}/quizzes`, {
      quizID: createdQuizID,
    })
    .then(function (response) {
      if (!response.data.success) res.status(200).send(response.data);
      else return;
    })
    .catch(function (err) {
      console.log(err);
    });
}

// to get the details of a quiz
function getQuiz(req, res) {
  const requiredQuizID = req.params.quizID;

  Quiz.findOne({ _id: requiredQuizID }, function (err, foundQuiz) {
    if (err) res.status(200).send({ success: false, message: err });
    else
      res.status(200).send({
        success: true,
        message: "Successfully retrived the quiz details.",
        quiz: foundQuiz,
      });
  });
}

// to update the quiz details when the quiz is edited
function updateQuiz(req, res) {
  const updatedQuizID = req.params.quizID;
  const updatedDetails = req.body;

  Quiz.findOneAndUpdate(
    { _id: updatedQuizID },
    updatedDetails,
    function (err, updatedQuiz) {
      if (err) {
        if (err.code === 11000)
          res.status(200).send({
            success: false,
            message:
              "This Quiz Name is already in use. Please choose a different name.",
          });
        else res.status(200).send({ success: false, message: err });
      } else
        res.status(200).send({
          success: true,
          message: "Successfully updated the quiz.",
          quiz: updatedQuiz,
        });
    }
  );
}

// to add an assignee to the quiz
function addAssignee(req, res) {
  const updatedQuizID = req.params.quizID;
  const assigneeUserName = req.body.assigneeUserName;

  Quiz.findOneAndUpdate(
    { _id: updatedQuizID },
    { $push: { assignedTo: assigneeUserName } },
    { returnDocument: "after" },
    function (err, updatedQuiz) {
      if (err) res.status(200).send({ success: false, message: err });
      else {
        // if successfully added the assignee to the quiz,
        // add the quiz to the assignee as well
        addQuizToAssignee(req, res);

        res.status(200).send({
          success: true,
          message: "Successfully added the assignee to the quiz document.",
          quiz: updatedQuiz,
        });
      }
    }
  );
}

// to add the quiz to the assignee's document
function addQuizToAssignee(req, res) {
  axios
    .post(
      `http://localhost:8000/students/${req.body.assigneeUserName}/quizzes`,
      { quizID: req.params.quizID }
    )
    .then(function (response) {
      if (!response.data.success) res.status(200).send(response.data);
      else return;
    })
    .catch(function (err) {
      console.log(err);
    });
}

// to remove an assignee from the quiz
function removeAssignee(req, res) {
  const updatedQuizID = req.params.quizID;
  const assigneeUserName = req.params.assigneeUserName;

  Quiz.findOneAndUpdate(
    { _id: updatedQuizID },
    { $pull: { assignedTo: assigneeUserName } },
    { returnDocument: "after" },
    function (err, updatedQuiz) {
      if (err) res.status(200).send({ success: false, message: err });
      else {
        // if successfully removed the assignee from the quiz,
        // remove the quiz from the assignee as well
        removeQuizFromAssignee(req, res);

        res.status(200).send({
          success: true,
          message: "Successfully removed the assignee from the quiz document.",
          quiz: updatedQuiz,
        });
      }
    }
  );
}

// to remove the quiz from the assignee's document
function removeQuizFromAssignee(req, res) {
  axios
    .delete(
      `http://localhost:8000/students/${req.params.assigneeUserName}/quizzes/${req.params.quizID}`
    )
    .then(function (response) {
      if (!response.data.success) res.status(200).send(response.data);
      else return;
    })
    .catch(function (err) {
      console.log(err);
    });
}

// to delete a quiz
function deleteQuiz(req, res) {
  const deletedQuizID = req.params.quizID;

  Quiz.findOneAndDelete({ _id: deletedQuizID }, function (err, deletedQuiz) {
    if (err) res.status(200).send({ success: false, message: err });
    else {
      // if the quiz has been deleted, it also has to be deleted from the author's and the assignees' DB
      deleteQuizFromAuthor(res, deletedQuiz);
      deleteQuizFromAssignees(res, deletedQuiz);

      res.status(200).send({
        success: true,
        message: "Successfully deleted the quiz.",
        quiz: deletedQuiz,
      });
    }
  });
}

// to delete a quiz from the author's DB
function deleteQuizFromAuthor(res, deletedQuiz) {
  axios
    .delete(
      `http://localhost:8000/teachers/${deletedQuiz.author}/quizzes/${deletedQuiz._id}`
    )
    .then(function (response) {
      if (!response.data.success) res.status(200).send(response.data);
      else return;
    })
    .catch(function (err) {
      console.log(err);
    });
}

// to delete a quiz from the assignees' DB
function deleteQuizFromAssignees(res, deletedQuiz) {
  // for each student to whom the quiz is assignes, delete the quizID from its DB
  deletedQuiz.assignedTo.forEach((assigneeUserName) => {
    axios
      .delete(
        `http://localhost:8000/students/${assigneeUserName}/quizzes/${deletedQuiz._id}`
      )
      .then(function (response) {
        if (!response.data.success) res.status(200).send(response.data);
        else return;
      })
      .catch(function (err) {
        console.log(err);
      });
  });
}

module.exports = {
  createQuiz,
  getQuiz,
  updateQuiz,
  addAssignee,
  removeAssignee,
  deleteQuiz,
};
