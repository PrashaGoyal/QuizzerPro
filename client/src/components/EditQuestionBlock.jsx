import React from "react";
import { Form, Row, Col } from "react-bootstrap";

// Material UI icons
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function EditQuestionBlock(props) {
  return (
    <Form onSubmit={props.qId === "-1" ? props.handleAddQuestion : () => ""}>
      {/* onSubmit handler only in case of a new question */}

      <Form.Group className="mb-3">
        <Row className="mb-2">
          <Col sm={10}>
            <Form.Label className="fs-5">
              Question {props.qId > -1 ? props.qId + 1 : ""}
            </Form.Label>
          </Col>
          {props.qId !== "-1" && (
            <Col className="text-end">
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                questionid={props.qId}
                onClick={props.handleDeleteQuestion}
              >
                Delete Question
              </Button>
            </Col>
          )}
        </Row>

        <Form.Control
          as="textarea"
          rows={3}
          name="questionTitle"
          placeholder="Type your question here..."
          value={props.question.questionTitle}
          questionid={props.qId}
          onChange={props.handleQuestionDetailsChange}
        />
      </Form.Group>

      <Row>
        <Col sm={10}>
          <Form.Group className="w-75">
            <Form.Label className="fs-5">
              Answers <span className="fs-6">(tick the correct answers)</span>
            </Form.Label>

            {props.question.options.map((option, opId) => (
              <div key={opId} className="mb-2">
                <input
                  type="checkbox"
                  className="form-check-input d-inline-block mt-2 me-3"
                  name="isCorrect"
                  checked={option.isCorrect}
                  questionid={props.qId}
                  optionid={opId}
                  onChange={props.handleOptionDetailsChange}
                />

                <input
                  className="editable-value w-75 me-3"
                  type="text"
                  name="optionContent"
                  questionid={props.qId}
                  optionid={opId}
                  value={option.optionContent}
                  onChange={props.handleOptionDetailsChange}
                />

                <ClearIcon
                  questionid={props.qId}
                  optionid={opId}
                  onClick={props.deleteOptionHandler}
                />
              </div>
            ))}

            <div
              className="d-inline-block mt-2 add-option"
              questionid={props.qId}
              onClick={props.addOptionHandler}
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
              value={props.question.marks > -1 ? props.question.marks : ""}
              questionid={props.qId}
              onChange={props.handleQuestionDetailsChange}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* display the 'Add Question' button only if it is a new question */}
      {props.qId === "-1" ? (
        <button
          className="btn btn-danger btn-md px-4 me-2 mt-3 d-block btn-red"
          type="submit"
        >
          Add question
        </button>
      ) : (
        <hr />
      )}
    </Form>
  );
}

export default EditQuestionBlock;
