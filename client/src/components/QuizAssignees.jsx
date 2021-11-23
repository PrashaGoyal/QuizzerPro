import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Table, Button, Row, Col, Image } from "react-bootstrap";

// importing react components
import DeleteConfirmationModal from "./DeleteConfirmationModal";

// importing the axios package
const axios = require("axios");

function QuizAssignees() {
  // to access the data passed to the route
  const location = useLocation();

  const [deleteConfirmationModalShow, setDeleteConfirmationModalShow] =
    React.useState(false); // to set the show state of the "DeleteConfirmation" Modal
  const [studentUserNameToRemove, setStudentUserNameToRemove] =
    React.useState(""); // to store the quizID to be deleted. This is sent to the DeleteConfirmation Modal

  const [quiz, setQuiz] = React.useState(location.state.quiz); //to store the quiz details
  const [assigneeList, setAssigneeList] = React.useState(quiz.assignedTo); // to store the assignee list
  const [errorMsg, setErrorMsg] = React.useState(""); // to store the error msg, if any
  const [studentList, setStudentList] = React.useState([]); // to store the list of students

  // for events that take place on loading component
  React.useEffect(() => {
    // API call to get the list of all students
    axios
      .get("http://localhost:8000/students")
      .then(function (response) {
        if (!response.data.success)
          setErrorMsg("Unable to fetch the student list.");
        else {
          // if succesfully fetched the student list
          setErrorMsg("");

          // set the student list
          setStudentList(response.data.students);

          if (!response.data.students.length)
            setErrorMsg("No students have signed-up yet!");
        }
      })
      .catch(function (err) {
        console.log(err);
        setErrorMsg("Unable to fetch the student list.");
      });

    // API call to get the quiz details.
    // Note: On refreshing the page, 'quiz' gets set to 'location.state.quiz', which might not be the latest version of the quiz.
    axios
      .get(`http://localhost:8000/quizzes/${quiz._id}`)
      .then(function (response) {
        if (!response.data.success)
          setErrorMsg("Unable to update the assignee list.");
        else {
          // if successfully fetched the quiz details
          setQuiz(response.data.quiz);
          setAssigneeList(response.data.quiz.assignedTo);
        }
      })
      .catch(function (err) {
        console.log(err);
        setErrorMsg("Unable to update the assignee list.");
      });
  }, []);

  // to add student to the quiz assignee list
  function addAssigneeHandler(event) {
    const studentUserName = event.target.getAttribute("value");

    // API call to add the student to the quiz assignee list
    axios
      .post(`http://localhost:8000/quizzes/${quiz._id}/assignees`, {
        assigneeUserName: studentUserName,
      })
      .then(function (response) {
        if (!response.data.success)
          alert(
            "Unable to assign quiz to the student. Please try again later."
          );
        // if successfully added the student as assignee, set the new assignee list
        else setAssigneeList(response.data.quiz.assignedTo);
      })
      .catch(function (err) {
        console.log(err);
        alert("Unable to assign quiz to the student. Please try again later.");
      });
  }

  // to remove student from the quiz assignee list
  function removeAssigneeHandler(event) {
    const studentUserName = event.target.getAttribute("value");

    // API call to remove the student from the quiz assignee list
    axios
      .delete(
        `http://localhost:8000/quizzes/${quiz._id}/assignees/${studentUserName}`
      )
      .then(function (response) {
        if (!response.data.success)
          alert(
            "Unable to un-assign quiz to the student. Please try again later."
          );
        // if successfully removed the student as assignee
        else setAssigneeList(response.data.quiz.assignedTo);
      })
      .catch(function (err) {
        console.log(err);
        alert(
          "Unable to un-assign quiz to the student. Please try again later."
        );
      });

    // hide the DeleteConfirmation Modal
    setDeleteConfirmationModalShow(false);
  }

  return (
    <Container fluid className="px-5">
      <h1 className="display-5 fs-3 my-5 fst-italic">
        Edit Assignee List for "{quiz.quizName}"
      </h1>

      {/* modal pop-up to confirm the assignee removal */}
      <DeleteConfirmationModal
        item="assignee"
        itemidentifier={studentUserNameToRemove}
        itemname={studentUserNameToRemove}
        deleteItem={removeAssigneeHandler}
        show={deleteConfirmationModalShow}
        onHide={() => setDeleteConfirmationModalShow(false)}
      />

      <Row className="container-fluid">
        <Col className="align-items-center">
          {/* if there is some error, display the msg; else render the student list */}
          {errorMsg ? (
            <p className="fs-5">{errorMsg}</p>
          ) : (
            <div>
              <p className="fs-5 fst-italic">
                Add/Remove students from the assignee list:
              </p>

              <Table responsive className="table-assignee">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Add/Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {studentList.map((student, index) => (
                    <tr key={student._id}>
                      <td>{index + 1}</td>
                      <td>{student.userName}</td>
                      <td>
                        {assigneeList.includes(student.userName) ? (
                          <Button
                            variant="danger"
                            className="btn-sm btn-red"
                            value={student.userName}
                            onClick={() => {
                              setStudentUserNameToRemove(student.userName); // since the quizID needs to be passed to the DeleteConfirmation Modal
                              setDeleteConfirmationModalShow(true);
                            }}
                          >
                            Remove
                          </Button>
                        ) : (
                          <Button
                            className="btn-sm btn-blue"
                            value={student.userName}
                            onClick={addAssigneeHandler}
                          >
                            Add
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Col>

        <Col className="p-5 d-flex align-items-center">
          <Image
            src={"/img/list.jpeg"}
            className="d-block mx-auto w-75"
            rounded
          />
        </Col>
      </Row>
    </Container>
  );
}

export default QuizAssignees;
