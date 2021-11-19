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

// to add the quizID of quiz created
function addQuiz(req, res) {
  const userName = req.params.teacherUserName;
  const newQuizID = req.body.quizID;

  Teacher.findOneAndUpdate(
    { userName: userName },
    { $push: { quizIDs: newQuizID } },
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

module.exports = { createTeacher, addQuiz };