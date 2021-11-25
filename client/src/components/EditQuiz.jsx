import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";

// Material UI icons
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

function EditQuiz() {
  // to access the data passed to the route
  const location = useLocation();

  const [editNameShow, setEditNameShow] = React.useState(false); // to store the show state of the edit name input field
  const [quiz, setQuiz] = React.useState(location.state.quiz); // to store the quiz details
  const [questionList, setQuestionList] = React.useState(quiz.questions); // to store the question list
  // to store the details of the new question
  const [newQuestion, setNewQuestion] = React.useState({
    questionTitle: "",
    options: [{ optionContent: "Option", isCorrect: false }],
    marks: -1,
  });

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

  // to handle changes in question details, other than options details change
  function handleQuestionDetailsChange(event) {
    const questionId = event.target.getAttribute("questionid"); // gives the index of the question in the list
    const { name, value } = event.target;

    // if the questionId is '-1', the change is made in the new question
    if (questionId === "-1")
      setNewQuestion((prevQuestionDetails) => ({
        ...prevQuestionDetails,
        [name]: value,
      }));
  }

  // to handle option addition
  function addOptionHandler(event) {
    const questionId = event.target.getAttribute("questionid"); // gives the index in the question list

    // if the questionId is '-1', option has to be added to the new question
    if (questionId === "-1") {
      const newOption = { optionContent: "Option", isCorrect: false };
      const newOptionList = [...newQuestion.options, newOption];

      setNewQuestion((prevQuestionDetails) => ({
        ...prevQuestionDetails,
        options: newOptionList,
      }));
    }
  }

  // to handle option deletion
  function deleteOptionHandler(event) {
    const questionId = event.currentTarget.getAttribute("questionid"); // gives the index of the question in the list
    const optionId = event.currentTarget.getAttribute("optionid"); // gives the index of the option in the option list of the question

    // if questionId is '-1', the change is made in the new question
    if (questionId === "-1") {
      const newOptionList = newQuestion.options;
      newOptionList.splice(optionId, 1);

      setNewQuestion((prevQuestionDetails) => ({
        ...prevQuestionDetails,
        options: newOptionList,
      }));
    }
  }

  // to hangle changes in an option content
  function handleOptionDetailsChange(event) {
    const questionId = event.target.getAttribute("questionid"); // gives the index of the question in the list
    const optionId = event.target.getAttribute("optionid"); // gives the index of the option in the option list of the question
    const inputType = event.target.type;

    // if the questionId is '-1', the change is made in the new question
    if (questionId === "-1") {
      let optionList = newQuestion.options;

      // make changes to the optionContent or the isCorrect attribute accordingly
      if (inputType === "text")
        optionList[optionId].optionContent = event.target.value;
      else optionList[optionId].isCorrect = event.target.checked;

      setNewQuestion((prevQuestionDetails) => ({
        ...prevQuestionDetails,
        options: optionList,
      }));
    }
  }

  // to handle addition of a question block
  function handleAddQuestion(event) {
    console.log("add question");
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

      {/* display question details for each question */}
      {questionList.forEach((question, qId) => (
        <div key={qId}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">Question {qId}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="questionTitle"
                value={question.questionTitle}
                questionid={qId}
                onChange={handleQuestionDetailsChange}
              />
            </Form.Group>

            <Row>
              <Col sm={10}>
                <Form.Group className="w-75">
                  <Form.Label className="fs-5">
                    Answers{" "}
                    <span className="fs-6">(tick the correct answers)</span>
                  </Form.Label>

                  {question.options.map((option, opId) => (
                    <div key={opId} className="mb-2">
                      <input
                        type="checkbox"
                        className="form-check-input d-inline-block mt-2 me-3"
                        checked={option.isCorrect}
                        questionid={qId}
                        optionid={opId}
                        onChange={handleOptionDetailsChange}
                      />
                      <input
                        className="editable-value w-75 me-3"
                        type="text"
                        questionid={qId}
                        optionid={opId}
                        value={option.optionContent}
                        onChange={handleOptionDetailsChange}
                      />
                      <ClearIcon
                        questionid={qId}
                        optionid={opId}
                        onClick={deleteOptionHandler}
                      />
                    </div>
                  ))}
                  <div
                    className="d-inline-block mt-2 add-option"
                    questionid={qId}
                    onClick={addOptionHandler}
                  >
                    + Add Option
                  </div>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="">Marks:</Form.Label>
                  <Form.Control
                    type="text"
                    name="marks"
                    placeholder="Allot marks"
                    value={question.marks}
                    questionid="-1"
                    onChange={handleQuestionDetailsChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <hr />
        </div>
      ))}

      {/* add an extra question block for new question */}
      <Form onSubmit={handleAddQuestion}>
        <Form.Group className="mb-3">
          <Form.Label className="fs-5">Question</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="questionTitle"
            placeholder="Type the question here..."
            value={newQuestion.questionTitle}
            questionid="-1"
            onChange={handleQuestionDetailsChange}
          />
        </Form.Group>

        <Row>
          <Col sm={10}>
            <Form.Group className="w-75 d-inline-block">
              <Form.Label className="fs-5">
                Answers <span className="fs-6">(tick the correct answers)</span>
              </Form.Label>

              {newQuestion.options.map((option, opId) => (
                <div key={opId} className="mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input d-inline-block mt-2 me-3"
                    checked={option.isCorrect}
                    questionid="-1"
                    optionid={opId}
                    onChange={handleOptionDetailsChange}
                  />
                  <input
                    className="editable-value w-75 me-3"
                    type="text"
                    questionid="-1"
                    optionid={opId}
                    value={option.optionContent}
                    onChange={handleOptionDetailsChange}
                  />
                  <ClearIcon
                    questionid="-1"
                    optionid={opId}
                    onClick={deleteOptionHandler}
                  />
                </div>
              ))}
              <div
                className="d-inline-block mt-2 add-option"
                questionid="-1"
                onClick={addOptionHandler}
              >
                + Add Option
              </div>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="">Marks:</Form.Label>
              <Form.Control
                type="text"
                name="marks"
                placeholder="Allot marks"
                value={newQuestion.marks > -1 ? newQuestion.marks : ""}
                questionid="-1"
                onChange={handleQuestionDetailsChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <button
          className="btn btn-danger btn-md px-4 me-2 mt-3 d-block btn-red"
          type="submit"
        >
          Add question
        </button>
      </Form>

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
