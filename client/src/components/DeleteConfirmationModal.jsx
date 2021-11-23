import React from "react";
import { Button, Modal } from "react-bootstrap";

function DeleteConfirmationModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-deleteconfirmation"
      id="name-quiz"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-deleteconfirmation">
          Delete Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mt-2">
          Are your sure you want to
          {/* since we are using the same modal for delete confirmation of "quiz" and "assignee" */}
          {props.item === "quiz"
            ? " delete the quiz '"
            : " remove the student '"}
          {props.itemname}' ?
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="danger"
          className="btn-red"
          value={props.itemidentifier}
          onClick={props.deleteItem}
        >
          Yes
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmationModal;
