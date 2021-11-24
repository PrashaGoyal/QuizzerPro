import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Form } from "react-bootstrap";

// Material UI icons
import EditIcon from "@mui/icons-material/Edit";

function EditQuiz() {
  // to access the data passed to the route
  const location = useLocation();

  const [editNameShow, setEditNameShow] = React.useState(false); // to store the show state of the edit name input field
  const [quiz, setQuiz] = React.useState(location.state.quiz); // to store the quiz details
  const [questionList, setQuestionList] = React.useState(quiz.questions); // to store the question list

  // to handle addition of a question block
  function handleAddQuestion(event) {}

  // to handle key press on the edit name input field
  function editQuizNameHandler(event) {
    if (event.key === "Enter" || event.key === "Tab") {
      setEditNameShow(false);
      event.preventDefault();
    }
  }

  // to handle the change of quiz name
  function handleQuizNameChange(event) {
    const { name, value } = event.target;
    setQuiz({ ...quiz, [name]: value });
  }

  return (
    <Container fluid className="px-5">
      {/* show the option to edit quizName */}
      {editNameShow ? (
        <input
          type="text"
          className="fs-4 my-5 w-50 editable-value"
          name="quizName"
          value={quiz.quizName}
          autoFocus={true}
          onKeyDown={editQuizNameHandler}
          onChange={handleQuizNameChange}
        />
      ) : (
        // quizName can be edited on clicking the EditIcon
        <h1 className="display-5 fs-3 my-5 fst-italic">
          {quiz.quizName} <EditIcon onClick={() => setEditNameShow(true)} />
        </h1>
      )}

      {questionList.forEach((question, index) => (
        // display question details for each question
        <div key={index} className="question">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">Question {index}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="questionTitle"
                value={question.questionTitle}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="fs-5">
                Answers <span className="fs-6">(tick the correct answers)</span>
              </Form.Label>
              {question.options.forEach((option, index) => (
                <div key={index}>
                  <Form.Check type="checkbox" className="d-inline-block me-3" />
                  <input
                    className="editable-value"
                    type="text"
                    value={option.optionContent}
                  />
                </div>
              ))}

              <div className="d-inline-block mt-2 add-option">+ Add Option</div>
            </Form.Group>
          </Form>
          <hr />
        </div>
      ))}

      {/* add an extra question block for new question */}
      <div className="question">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fs-5">Question</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="questionTitle"
              placeholder="Type the question here..."
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="fs-5">
              Answers <span className="fs-6">(tick the correct answers)</span>
            </Form.Label>
            <div>
              <Form.Check type="checkbox" className="d-inline-block me-3" />
              <input className="editable-value" type="text" value="Option" />
            </div>
            <div className="mt-2 add-option">+ Add Option</div>
          </Form.Group>
        </Form>
        <hr />
      </div>

      <button
        className="btn btn-danger btn-md px-4 me-2 mt-3 d-block btn-red"
        type="button"
        onClick={handleAddQuestion}
      >
        Add question
      </button>

      <div className="text-end">
        <button
          className="btn btn-primary btn-md px-4 me-5 mt-5 btn-blue"
          type="button"
        >
          Save
        </button>
      </div>
    </Container>
  );
}

export default EditQuiz;
