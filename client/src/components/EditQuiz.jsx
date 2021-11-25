import React from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

// importing react components
import EditQuestionBlock from "./EditQuestionBlock";

// Material UI icons
import EditIcon from "@mui/icons-material/Edit";

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
    else {
      let newQuestionList = questionList;
      newQuestionList[questionId] = {
        ...questionList[questionId],
        [name]: value,
      };

      setQuestionList(newQuestionList);
    }
  }

  // to handle option addition
  function addOptionHandler(event) {
    const questionId = event.target.getAttribute("questionid"); // gives the index in the question list
    const newOption = { optionContent: "Option", isCorrect: false };

    // if the questionId is '-1', option has to be added to the new question
    if (questionId === "-1") {
      const newOptionList = [...newQuestion.options, newOption];

      setNewQuestion((prevQuestionDetails) => ({
        ...prevQuestionDetails,
        options: newOptionList,
      }));
    } else {
      let newQuestionList = questionList;
      newQuestionList[questionId].options.push(newOption);

      setQuestionList(newQuestionList);
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
    } else {
      let newQuestionList = questionList;
      newQuestionList[questionId].options.splice(optionId, 1);

      setQuestionList(newQuestionList);
    }
  }

  // to hangle changes in an option content
  function handleOptionDetailsChange(event) {
    const questionId = event.target.getAttribute("questionid"); // gives the index of the question in the list
    const optionId = event.target.getAttribute("optionid"); // gives the index of the option in the option list of the question
    const inputType = event.target.type;

    let optionList;

    // if the questionId is '-1', the change is made in the new question
    optionList =
      questionId === "-1"
        ? newQuestion.options
        : questionList[questionId].options;

    // make changes to the optionContent or the isCorrect attribute accordingly
    if (inputType === "text")
      optionList[optionId].optionContent = event.target.value;
    else optionList[optionId].isCorrect = event.target.checked;

    if (questionId === "-1") {
      setNewQuestion((prevQuestionDetails) => ({
        ...prevQuestionDetails,
        options: optionList,
      }));
    } else {
      let newQuestionList = questionList;
      newQuestionList[questionId].options = optionList;

      setQuestionList(newQuestionList);
    }
  }

  // to handle addition of a question block
  function handleAddQuestion(event) {
    event.preventDefault();
    console.log(newQuestion);
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
        <EditQuestionBlock
          qId={qId}
          question={question}
          handleQuestionDetailsChange={handleQuestionDetailsChange}
          handleOptionDetailsChange={handleOptionDetailsChange}
          addOptionHandler={addOptionHandler}
          deleteOptionHandler={deleteOptionHandler}
        />
      ))}

      {/* add an extra question block for new question */}
      <EditQuestionBlock
        qId="-1"
        question={newQuestion}
        handleQuestionDetailsChange={handleQuestionDetailsChange}
        handleOptionDetailsChange={handleOptionDetailsChange}
        addOptionHandler={addOptionHandler}
        deleteOptionHandler={deleteOptionHandler}
        handleAddQuestion={handleAddQuestion}
      />

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
