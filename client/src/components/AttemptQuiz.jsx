import React from "react";
import { Container, Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

// importing the axios package
const axios = require("axios");

function AttemptQuiz() {
  const cookies = new Cookies();

  // to access the data passed to the route
  const location = useLocation();
  const quiz = location.state.quiz; // to store the quiz details

  const [errorMsg, setErrorMsg] = React.useState(""); // to store the error msg, if any
  const [attemptMsgShow, setAttemptMsgShow] = React.useState(false); // to store the show state of the attempt msg

  // to extract the student response
  function extractResponse() {
    let responseList = [];
    // extract each card details
    const responseHTMLCollection = document.getElementsByClassName("card-body");

    Array.from(responseHTMLCollection).forEach((response) => {
      let optionResponses = [];

      // extract the checkbox list for each card
      const optionList = response.getElementsByClassName("form-check-input");
      Array.from(optionList).forEach((option) =>
        optionResponses.push({
          opId: option.getAttribute("optionid"),
          isChecked: option.checked,
        })
      );

      responseList.push({
        qId: response.getAttribute("questionid"),
        optionResponses: optionResponses,
      });
    });

    return responseList;
  }

  // to check if a question id unattempted
  function checkUnattemptedQuestion(responseList) {
    let isUnattempted = false;

    responseList.forEach((response) => {
      // filter the checked options for each question
      const checkedOptions = response.optionResponses.filter(
        (option) => option.isChecked === true
      );

      // if there are no checked options, the question is unattempted.
      if (checkedOptions.length === 0) isUnattempted |= true;
    });

    return isUnattempted;
  }

  // to calculate the score of the student
  function calculateScore(responseList) {
    let score = 0;

    responseList.forEach((response) => {
      let qId = response.qId;
      let actualQuestion = quiz.questions[qId];

      // check the correct options agains the checked options
      const matchList = response.optionResponses.filter((resOption) => {
        let opId = resOption.opId;

        return resOption.isChecked === actualQuestion.options[opId].isCorrect;
      });

      // if the entire lists match, add the score
      if (matchList.length === actualQuestion.options.length)
        score += actualQuestion.marks;
    });

    return score;
  }

  // to handle quiz submission
  function handleSubmitQuiz() {
    // extracting the student response
    const responseList = extractResponse();

    // check if a question is unattempted
    const isUnattempted = checkUnattemptedQuestion(responseList);
    if (isUnattempted)
      setErrorMsg("Please attempt all questions before submitting.");
    else {
      setErrorMsg("");

      // calculate score
      const score = calculateScore(responseList);

      // API call to update the quiz details particular to the student
      axios
        .patch(
          `http://localhost:8000/students/${cookies.get("userName")}/quizzes/${
            quiz._id
          }`,
          { score: score }
        )
        .then(function (response) {
          if (!response.data.success)
            alert("Unable to record your response. Please try again later.");
          // show the thankyou msg if response recorded successfully.
          else setAttemptMsgShow(true);
        })
        .catch(function (err) {
          console.log(err);
          alert("Unable to record your response. Please try again later.");
        });
    }
  }

  return (
    <Container fluid className="w-75 px-5">
      <h1 className="display-5 fs-3 mt-5 mb-4 fst-italic attempt-quiz-heading">
        {quiz.quizName}
      </h1>

      {/* show appropriate on successfully attempting quiz */}
      {attemptMsgShow ? (
        <Card bg="light" className="mb-3">
          <Card.Body>
            <Card.Title>Thankyou for attempting the quiz!</Card.Title>
            <Card.Text>
              Your response has been recorded. Your score is displayed on your
              dashboard.
            </Card.Text>
            <Link to="/quizzes">Back to Quizzes</Link>
          </Card.Body>
        </Card>
      ) : quiz.questions.length === 0 ? (
        <h4>
          There are no questions in this quiz yet. Please contact the author.
        </h4>
      ) : (
        <div>
          {/* render a question card for each question */}
          {quiz.questions.map((question, qId) => (
            <Card key={qId} bg="light" className="mb-3">
              <Card.Header>Question {qId + 1}</Card.Header>

              <Card.Body questionid={qId}>
                <Card.Title className="mb-3">
                  {question.questionTitle}
                </Card.Title>

                {question.options.map((option, opId) => (
                  <div key={opId} className="mb-2 option">
                    <input
                      type="checkbox"
                      id={qId + "-" + opId}
                      className="form-check-input d-inline-block mt-2 me-3"
                      questionid={qId}
                      optionid={opId}
                    />
                    <label for={qId + "-" + opId}>{option.optionContent}</label>
                  </div>
                ))}
              </Card.Body>
            </Card>
          ))}

          <div className="text-end my-5 me-3">
            <p className=" d-inline-block me-3 error">{errorMsg}</p>

            <button
              className="btn btn-primary btn-md px-5 btn-blue"
              type="button"
              onClick={handleSubmitQuiz}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}

export default AttemptQuiz;
