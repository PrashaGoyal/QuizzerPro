import React from "react";
import { Container, Table, Button } from "react-bootstrap";

function QuizzesStudent() {
  return (
    <Container fluid className="px-5">
      <h1 class="display-5 fs-3 my-5 fst-italic">My Quizzes</h1>

      {/* table displaying the quizzes assigned to the student */}
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
          <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>--</td>
            <td>
              <Button variant="danger" className="btn-orange">
                Attempt
              </Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>--</td>
            <td>
              <Button variant="danger" className="btn-orange">
                Attempt
              </Button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>--</td>
            <td>
              <Button variant="danger" className="btn-orange">
                Attempt
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default QuizzesStudent;
