import React from "react";
import { Row, Col, Image } from "react-bootstrap";

function Quizzes() {
  return (
    //   If not logged in, display the static page directing to log-in.
    <div class="p-5">
      <Row className="container-fluid">
        <Col className="p-5 d-flex align-items-center">
          <div class="px-5">
            <h1 class="display-5 fs-1 fst-italic">Just One More Step!</h1>
            <p class="fs-5">
              Sign In to QuizzerPro to create your own quiz or enjoy answering
              some of them.😉
            </p>

            <br />
            <button
              class="btn btn-danger btn-md px-4 me-2 btn-red"
              type="button"
            >
              Sign In to Continue
            </button>
          </div>
        </Col>

        <Col className="p-5 d-flex align-items-center">
          <Image
            src={"/img/one-more-step.jpeg"}
            className="d-block mx-auto w-50 "
            rounded
          />
        </Col>
      </Row>
    </div>
  );
}

export default Quizzes;
