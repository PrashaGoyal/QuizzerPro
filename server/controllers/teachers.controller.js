const Teacher = require("../models/teachers.model");

// operations performed on the "teachers" model

// to create a new entry when a user signs-up as a "Teacher"
function createTeacher(req, res) {
  const newTeacher = {
    userName: req.body.userName,
    quizIDs: [], // a new teacher has not created any quizzes, hence, an empty array
  };

  Teacher.create(newTeacher, function (err) {
    if (err) res.status(200).send({ success: false, message: err });
    else
      res.status(200).send({
        success: true,
        message: "Successfully created the teacher's entry.",
        user: newTeacher,
      });
  });
}

// to get the details of a particular teacher
function getTeacher(req, res) {
  const userName = req.params.teacherUserName;

  Teacher.findOne({ userName: userName }, function (err, foundTeacher) {
    if (err) res.status(200).send({ success: false, message: err });
    else
      res.status(200).send({
        success: true,
        message: "Successfully fetched the teacher's details.",
        user: foundTeacher,
      });
  });
}

// to add the quizID of quiz created
function addQuiz(req, res) {
  const userName = req.params.teacherUserName;
  const newQuizID = req.body.quizID;

  Teacher.findOneAndUpdate(
    { userName: userName },
    { $push: { quizIDs: newQuizID } },
    { returnDocument: "after" },
    function (err, updatedTeacher) {
      if (err) res.status(200).send({ success: false, message: err });
      else
        res.status(200).send({
          success: true,
          message: "Successfully added the quiz to the teacher's document.",
          user: updatedTeacher,
        });
    }
  );
}

// to delete the quizID of quiz deleted
function deleteQuiz(req, res) {
  const userName = req.params.teacherUserName;
  const deletedQuizID = req.params.quizID;

  Teacher.findOneAndUpdate(
    { userName: userName },
    { $pull: { quizIDs: deletedQuizID } },
    { returnDocument: "after" },
    function (err, updatedTeacher) {
      if (err) res.status(200).send({ success: false, message: err });
      else
        res.status(200).send({
          success: true,
          message: "Successfully deleted the quiz from the teacher's document.",
          user: updatedTeacher,
        });
    }
  );
}

module.exports = { createTeacher, getTeacher, addQuiz, deleteQuiz };
