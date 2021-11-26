import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function HomePage() {
  const cookies = new Cookies();

  return (
    <div>
      {/* Panel-1 */}
      <div className="p-5">
        <Row className="container-fluid">
          <Col className="p-5 d-flex align-items-center">
            <div className="px-5">
              <h1 className="display-5 fs-1 fst-italic">
                Create an awesome quiz in minutes
              </h1>
              <p className="fs-5">
                Simply create your own quiz above to get started for free.
                Students login to the learning portal to access new quizzes.
              </p>
              <br />

              {/* If logged in, show the "Get Going" button", else, show the log-in buttons. */}
              {cookies.get("userName") ? (
                // If logged in, show this button
                <Link to="/quizzes">
                  <button
                    className="btn btn-secondary btn-md px-4 btn-red"
                    type="button"
                  >
                    Get Going
                  </button>
                </Link>
              ) : (
                // If not logged in, show the log-in buttons
                <span>
                  <Link to="/signin">
                    <button
                      className="btn btn-danger btn-md px-4 me-2 btn-red"
                      type="button"
                    >
                      Sign In
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button
                      className="btn btn-outline-danger btn-md px-4 ms-2 btn-red-outline"
                      type="button"
                    >
                      Sign Up
                    </button>
                  </Link>
                </span>
              )}

              <br />
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

      {/* Panel-2 */}

      <div className="p-5 panel-1">
        <Row className="container-fluid">
          <Col className="p-5 d-flex align-items-center">
            <Image
              src={"/img/stats.jpeg"}
              className="d-block mx-auto w-50"
              rounded
            />
          </Col>

          <Col className="p-5 d-flex align-items-center">
            <div className="px-5">
              <h1 className="display-5 fs-1 fst-italic">Auto Graded</h1>
              <p className=" fs-5">
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
