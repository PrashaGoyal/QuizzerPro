import React from "react";
import { Container, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

// Material UI Icons
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function QuizzesTeacher() {
  return (
    <Container fluid className="px-5">
      <h1 class="display-5 fs-3 my-5 fst-italic">My Quizzes</h1>

      <Link to="">
        <button
          class="btn btn-danger btn-md px-3 mb-4 btn-orange"
          type="button"
        >
          + New Quiz
        </button>
      </Link>

      {/* table displaying the quizzes created by the teacher */}
      <Table responsive className="table-teacher">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Created by</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Edit quiz</Tooltip>}
              >
                <DriveFileRenameOutlineIcon />
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Delete quiz</Tooltip>}
              >
                <DeleteOutlineIcon />
              </OverlayTrigger>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Edit quiz</Tooltip>}
              >
                <DriveFileRenameOutlineIcon />
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Delete quiz</Tooltip>}
              >
                <DeleteOutlineIcon />
              </OverlayTrigger>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Edit quiz</Tooltip>}
              >
                <DriveFileRenameOutlineIcon />
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Delete quiz</Tooltip>}
              >
                <DeleteOutlineIcon />
              </OverlayTrigger>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default QuizzesTeacher;
