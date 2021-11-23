const Student = require("../models/students.model");

// operations performed on the "students" model

// to create a new entry when a user signs-up as a "Student"
function createStudent(req, res) {
  const newStudent = {
    userName: req.body.userName,
    quizzes: [], // a new student has not been assigned any quizzes, hence, an empty array
  };

  Student.create(newStudent, function (err) {
    if (err) res.status(200).send({ success: false, message: err });
    else
      res.status(200).send({
        success: true,
        message: "Successfully created the student's entry.",
        user: newStudent,
      });
  });
}

// to get the details of all the students
function getAllStudents(req, res) {
  Student.find({}, function (err, foundStudents) {
    if (err) res.status(200).send({ success: false, message: err });
    else
      res.status(200).send({
        success: true,
        message: "Successfully retrieved all students.",
        students: foundStudents,
      });
  });
}

// to get the details of a particular student
function getStudent(req, res) {
  const userName = req.params.studentUserName;

  Student.findOne({ userName: userName }, function (err, foundStudent) {
    if (err) res.status(200).send({ success: false, message: err });
    else
      res
        .status(200)
        .send({
          success: true,
          message: "Successfully fetched the student's details.",
          user: foundStudent,
        });
  });
}

// to add the quiz details of the quiz assigned to the student
function addQuiz(req, res) {
  const userName = req.params.studentUserName;
  const newQuiz = {
    quizID: req.body.quizID,
    attempted: false,
    score: 0,
  };

  Student.findOneAndUpdate(
    { userName: userName },
    { $push: { quizzes: newQuiz } },
    { returnDocument: "after" },
    function (err, updatedStudent) {
      if (err) res.status(200).send({ success: false, message: err });
      else
        res.status(200).send({
          success: true,
          message: "Successfully added the quiz to the student's document.",
          user: updatedStudent,
        });
    }
  );
}

// to delete the quiz details of the quiz revoked for the student
function deleteQuiz(req, res) {
  const userName = req.params.studentUserName;
  const revokedQuizID = req.params.quizID;

  Student.findOneAndUpdate(
    { userName: userName },
    { $pull: { quizzes: { quizID: revokedQuizID } } }, // 'pull' from 'quizzes' array, where 'quizID'='revokedQuizID'
    { returnDocument: "after" },
    function (err, updatedStudent) {
      if (err) res.status(200).send({ success: false, message: err });
      else
        res.status(200).send({
          success: true,
          message: "Successfully deleted the quiz from the student's document.",
          user: updatedStudent,
        });
    }
  );
}

// to update the quiz details of the quiz attempted by the student
function updateQuiz(req, res) {
  const userName = req.params.studentUserName;
  const updatedQuizID = req.params.quizID;
  const quizScore = req.body.score;

  Student.findOneAndUpdate(
    { userName: userName },
    {
      $set: {
        "quizzes.$[quiz].attempted": true,
        "quizzes.$[quiz].score": quizScore, // set the score obtained in the 'quizzes' array
      },
    },
    {
      arrayFilters: [{ "quiz.quizID": updatedQuizID }], // where the 'quizID'='updatedQuizID'
      returnDocument: "after",
    },
    function (err, updatedStudent) {
      if (err) res.status(200).send({ success: false, message: err });
      else
        res.status(200).send({
          success: true,
          message:
            "Successfully updated the quiz details in the student's document.",
          user: updatedStudent,
        });
    }
  );
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudent,
  addQuiz,
  deleteQuiz,
  updateQuiz,
};
