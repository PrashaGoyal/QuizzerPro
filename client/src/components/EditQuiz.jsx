import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Form } from "react-bootstrap";

// Material UI icons
import EditIcon from "@mui/icons-material/Edit";

function EditQuiz() {
  // to access the data passed to the route
  const location = useLocation();
  const quiz = location.state.quiz;

  return (
    <Container fluid className="px-5">
      <h1 class="display-5 fs-3 my-5 fst-italic">
        {quiz.quizName} <EditIcon />
      </h1>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="fs-5">Question</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Form.Group>
          <Form.Label className="fs-5">
            Answers <span className="fs-6">(tick the correct answers)</span>
          </Form.Label>
          <Form.Check type="checkbox" label="Option 1" />
          <div className="d-inline-block mt-2 add-option">+ Add Option</div>
        </Form.Group>
      </Form>

      <button
        class="btn btn-danger btn-md px-4 me-2 mt-3 d-block btn-red"
        type="button"
      >
        Add question
      </button>

      <div class="text-end">
        <button
          class="btn btn-primary btn-md px-4 me-5 mt-5 btn-blue"
          type="button"
        >
          Save
        </button>
      </div>
    </Container>
  );
}

export default EditQuiz;
