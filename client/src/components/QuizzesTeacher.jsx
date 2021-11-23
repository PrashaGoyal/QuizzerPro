import React from "react";
import { Container, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

// import react components
import NameQuizModal from "./NameQuizModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

// Material UI Icons
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// importing the axios package
const axios = require("axios");

function QuizzesTeacher() {
  const cookies = new Cookies();

  const [nameQuizModalShow, setNameQuizModalShow] = React.useState(false); // to set the show state of the "NameQuiz" modal
  const [deleteConfirmationModalShow, setDeleteConfirmationModalShow] =
    React.useState(false); // to set the show state of the "DeleteConfirmation" Modal

  const [errorMsg, setErrorMsg] = React.useState(""); // to store the error msg, if any
  const [quizzes, setQuizzes] = React.useState([]); // to store the quiz details of all the quizzes created by the teacher

  const [quizIDToDelete, setQuizIDToDelete] = React.useState(""); // to store the quizID to be deleted. This is sent to the DeleteConfirmation Modal
  const [quizNameToDelete, setQuizNameToDelete] = React.useState(""); // to store the quizName to be deleted.

  // for events that take place on loading component
  React.useEffect(() => {
    // get the quizIDs of quizzes created by the user
    axios
      .get(`http://localhost:8000/teachers/${cookies.get("userName")}`)
      .then(function (response) {
        if (!response.data.success) setErrorMsg("Unable to load quizzes.");
        else {
          // if succesfully fetched the teacher's details
          setErrorMsg("");

          const fetchedQuizIDs = response.data.user.quizIDs;
          // fetch the details of each quiz
          fetchQuizDetails(fetchedQuizIDs);

          if (!fetchedQuizIDs.length)
            setErrorMsg("No quizzes to display. Create a new one.");
        }
      })
      .catch(function (err) {
        console.log(err);
        setErrorMsg("Unable to load quizzes.");
      });
  }, []);

  // to fetch the details of each quiz created by the teacher
  function fetchQuizDetails(quizIDs) {
    // auxillary array to store the quiz details
    let quizDetails = [];

    quizIDs.forEach((quizID) =>
      axios
        .get(`http://localhost:8000/quizzes/${quizID}`)
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

  // to handle the event of deleting a quiz
  function deleteQuizHandler(event) {
    // event.currentTarget contained the element that actually has the event listener
    const quizID = event.currentTarget.getAttribute("value");

    // API call to delete the quiz
    axios
      .delete(`http://localhost:8000/quizzes/${quizID}`)
      .then(function (response) {
        if (!response.data.success)
          alert("Unable to delete the quiz. Please try again later.");
        // if successfully deleted, remove the deleted quiz from the quizzes array
        else setQuizzes(quizzes.filter((quiz) => quiz._id !== quizID));
      })
      .catch(function (err) {
        console.log(err);
        alert("Unable to delete the quiz. Please try again later.");
      });

    // hide the DeleteConfirmation Modal
    setDeleteConfirmationModalShow(false);
  }

  return (
    <Container fluid className="px-5">
      <h1 className="display-5 fs-3 my-5 fst-italic">My Quizzes</h1>

      <Link to="">
        <button
          className="btn btn-danger btn-md px-3 mb-4 btn-orange"
          type="button"
          onClick={() => setNameQuizModalShow(true)}
        >
          + New Quiz
        </button>
      </Link>

      {/* modal pop-up to name the quiz being created */}
      <NameQuizModal
        show={nameQuizModalShow}
        onHide={() => setNameQuizModalShow(false)}
      />

      {/* modal pop-up to confirm the quiz deletion */}
      <DeleteConfirmationModal
        item="quiz"
        itemidentifier={quizIDToDelete}
        itemname={quizNameToDelete}
        deleteItem={deleteQuizHandler}
        show={deleteConfirmationModalShow}
        onHide={() => setDeleteConfirmationModalShow(false)}
      />

      {/* if there is some error, display the msg; else render the table of quizzes */}
      {errorMsg ? (
        <h4>{errorMsg}</h4>
      ) : (
        // table displaying the quizzes created by the teacher
        <Table responsive className="table-teacher">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Edit Quiz</th>
              <th>Assignee List</th>
              <th>Delete Quiz</th>
            </tr>
          </thead>

          <tbody>
            {/* create a table row for each quiz */}
            {quizzes.map((quiz, index) => (
              // render a table row for each quiz
              <tr key={quiz._id}>
                <td>{index + 1}</td>
                <td>{quiz.quizName}</td>
                <td>
                  <Link to={`/quizzes/${quiz.quizName}`} state={{ quiz: quiz }}>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip>Edit quiz</Tooltip>}
                    >
                      <DriveFileRenameOutlineIcon />
                    </OverlayTrigger>
                  </Link>
                </td>

                <td>
                  <Link
                    to={`/quizzes/${quiz.quizName}/assignees`}
                    state={{ quiz: quiz }}
                  >
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip>Edit assignee list</Tooltip>}
                    >
                      <ListAltIcon />
                    </OverlayTrigger>
                  </Link>
                </td>

                <td>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Delete quiz</Tooltip>}
                  >
                    <DeleteOutlineIcon
                      onClick={() => {
                        setQuizIDToDelete(quiz._id); // since the quizID and quizName needs to be passed to the DeleteConfirmation Modal
                        setQuizNameToDelete(quiz.quizName)
                        setDeleteConfirmationModalShow(true);
                      }}
                    />
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default QuizzesTeacher;
