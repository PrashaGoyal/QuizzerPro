import React from "react";
import { Container, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function AttemptQuiz() {
  // to access the data passed to the route
  const location = useLocation();
  const quiz = location.state.quiz; // to store the quiz details

  return (
    <Container fluid className="w-75 px-5">
      <h1 className="display-5 fs-3 mt-5 mb-4 fst-italic attempt-quiz-heading">
        {quiz.quizName}
      </h1>

      {/* render a question card for each question */}
      {quiz.questions.map((question, qId) => (
        <Card bg="light" className="mb-3">
          <Card.Header>Question {qId + 1}</Card.Header>

          <Card.Body>
            <Card.Title className="mb-3">{question.questionTitle}</Card.Title>

            <Card.Text>
              {question.options.map((option, opId) => (
                <div key={opId} className="mb-2">
                  <input
                    type="checkbox"
                    id={qId + "-" + opId}
                    className="form-check-input d-inline-block mt-2 me-3"
                    questionid={qId}
                    optionid={opId}
                  />
                  <label class="" for={qId + "-" + opId}>
                    {option.optionContent}
                  </label>
                </div>
              ))}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}

      <div className="text-end my-5">
        <button
          className="btn btn-primary btn-md px-5 me-3 btn-blue"
          type="button"
        >
          Submit Quiz
        </button>
      </div>
    </Container>
  );
}

export default AttemptQuiz;
