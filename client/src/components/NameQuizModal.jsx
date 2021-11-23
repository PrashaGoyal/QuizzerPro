import React from "react";
import { Navigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Cookies from "universal-cookie";

// importing the axios package
const axios = require("axios");

function NameQuizModal(props) {
  // to display the error msg, if any
  const [errorMsg, setErrorMsg] = React.useState("");
  // to store the redirect status. If quiz is created successfully, redirect to the EditQuiz page.
  const [redirectPath, setRedirectPath] = React.useState("");

  const cookies = new Cookies();

  // function to handle quiz creation
  function createQuizHandler() {
    const quizName = document.getElementById("quiz-name").value;

    // data requires for quiz creation
    const createQuizBody = {
      quizName: quizName,
      author: cookies.get("userName"),
    };

    // API call to create a quiz
    axios
      .post("http://localhost:8000/quizzes", createQuizBody)
      .then(function (response) {
        if (!response.data.success) setErrorMsg(response.data.message);
        else {
          // if successfully created, close the modal
          setErrorMsg("");
          props.onHide();
          setRedirectPath(quizName);
        }
      })
      .catch(function (err) {
        console.log(err);
        setErrorMsg(
          "Unable to create the quiz. Please try again after some time."
        );
      });
  }

  if (redirectPath) return <Navigate to={`/quizzes/${redirectPath}`} />;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-namequiz"
      id="name-quiz"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-namequiz">Name Quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p class="mt-2">Choose a unique name for the quiz.</p>

        {/* to take input the name of the quiz */}
        <input
          type="text"
          class="form-control"
          id="quiz-name"
          placeholder="Quiz Name"
          name="quizName"
        />

        <p class="error">{errorMsg}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="danger"
          className="btn-orange"
          onClick={createQuizHandler}
        >
          Create Quiz
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NameQuizModal;
