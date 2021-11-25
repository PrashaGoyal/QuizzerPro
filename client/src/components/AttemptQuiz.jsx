import React from "react";
import { Container, Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function AttemptQuiz() {
  // to access the data passed to the route
  const location = useLocation();
  const quiz = location.state.quiz; // to store the quiz details

  return (
    <Container fluid className="w-75 px-5">
      <h1 className="display-5 fs-3 mt-5 mb-4 fst-italic attempt-quiz-heading">
        {quiz.quizName}
      </h1>

      {/* <Card bg="light" className="mb-3">
        <Card.Body>
          <Card.Title>Thankyou for attempting the quiz!</Card.Title>
          <Card.Text>
            Your response has been recorded. Your score is displayed on your
            dashboard.
          </Card.Text>
          <Link to="/quizzes">Back to Dashboard</Link>
        </Card.Body>
      </Card> */}

      {quiz.questions.length === 0 ? (
        <h4>
          There are no questions in this quiz yet. Please contact the author.
        </h4>
      ) : (
        <div>
          {/* render a question card for each question */}
          {quiz.questions.map((question, qId) => (
            <Card bg="light" className="mb-3">
              <Card.Header>Question {qId + 1}</Card.Header>

              <Card.Body>
                <Card.Title className="mb-3">
                  {question.questionTitle}
                </Card.Title>

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
        </div>
      )}
    </Container>
  );
}

export default AttemptQuiz;
