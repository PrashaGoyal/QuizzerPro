import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import Cookies from "universal-cookie";

// importing the axios package
const axios = require("axios");

function QuizzesStudent() {
  const cookies = new Cookies();

  const [errorMsg, setErrorMsg] = React.useState(""); // to store the error msg, if any
  const [studentDetails, setStudentDetails] = React.useState({}); // to store the student details
  const [quizzes, setQuizzes] = React.useState([]); // to store the quiz details of all the quizzes assigned to the student

  // for events that take place on loading component
  React.useEffect(() => {
    // get the quizIDs of quizzes assigned to the student
    axios
      .get(`http://localhost:8000/students/${cookies.get("userName")}`)
      .then(function (response) {
        if (!response.data.success) setErrorMsg("Unable to load quizzes.");
        else {
          // if succesfully fetched the student's details
          setErrorMsg("");

          // store the student details
          setStudentDetails(response.data.user);

          const fetchedQuizzes = response.data.user.quizzes;
          // fetch the details of each quiz
          fetchQuizDetails(fetchedQuizzes);

          if (!fetchedQuizzes.length)
            setErrorMsg("No quizzes assigned. Enjoy!");
        }
      })
      .catch(function (err) {
        console.log(err);
        setErrorMsg("Unable to load quizzes.");
      });
  }, []);

  // to fetch the details of each quiz assigned to the student
  function fetchQuizDetails(quizzes) {
    // auxillary array to store the quiz details
    let quizDetails = [];

    quizzes.forEach((quiz) =>
      axios
        .get(`http://localhost:8000/quizzes/${quiz.quizID}`)
        .then(function (response) {
          // update the quiz details array
          quizDetails.push(response.data.quiz);

          // set the state of the quizzes useState [*.slice() is imp*]
          setQuizzes(quizDetails.slice());
        })
        .catch(function (err) {
          console.log(err);
        })
    );
  }

  return (
    <Container fluid className="px-5">
      <h1 class="display-5 fs-3 my-5 fst-italic">My Quizzes</h1>

      {/* if there is some error, display the msg; else render the table of quizzes */}
      {errorMsg ? (
        <h4>{errorMsg}</h4>
      ) : (
        // table displaying the quizzes assigned to the student
        <Table responsive className="table-student">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Created by</th>
              <th>Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* create a table row for each quiz */}
            {quizzes.map((quiz, index) => (
              // render a table row for each quiz
              <tr key={quiz._id}>
                <td>{index + 1}</td>
                <td>{quiz.quizName}</td>
                <td>{quiz.author}</td>
                <td>
                  {studentDetails.quizzes[index].attempted
                    ? studentDetails.quizzes[index].score
                    : "--"}
                </td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-orange"
                    disabled={studentDetails.quizzes[index].attempted}
                  >
                    Attempt
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default QuizzesStudent;
