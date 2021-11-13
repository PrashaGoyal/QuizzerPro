import React from "react";
import { Row, Col, Image } from "react-bootstrap";

function HomePage() {
  return (
    <div>
      <div class="p-5">
        <Row className="container-fluid">
          <Col className="p-5 d-flex align-items-center">
            <div class="px-5">
              <h1 class="display-5 fs-1 fst-italic">
                Create an awesome quiz in minutes
              </h1>
              <p class="col-md-8 fs-5">
                Simply create your own quiz above to get started for free.
                Students login to the learning portal to access new quizzes.
              </p>
              <button class="btn btn-secondary btn-md px-4 me-2" type="button">
                Sign In
              </button>
              <button
                class="btn btn-outline-secondary btn-md px-4 ms-2"
                type="button"
              >
                Sign Up
              </button>
              <br />
              <button class="btn btn-secondary btn-md px-4" type="button">
                Get Going
              </button>
            </div>
          </Col>

          <Col className="p-5 d-flex align-items-center">
            <Image
              src={"/img/quiz.jpeg"}
              className="d-block mx-auto w-50 "
              rounded
            />
          </Col>
        </Row>
      </div>

      <div class="p-5 bg-light">
        <Row className="container-fluid">
          <Col className="p-5 d-flex align-items-center">
            <Image
              src={"/img/stats.jpeg"}
              className="d-block mx-auto w-50"
              rounded
            />
          </Col>

          <Col className="p-5 d-flex align-items-center">
            <div class="px-5">
              <h1 class="display-5 fs-1 fst-italic">Auto Graded</h1>
              <p class="col-md-8 fs-5">
                Students get to know there scores immediately after completing
                the quiz. No hassle of manually checking the response.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
