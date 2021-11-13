import React from "react";

import { Navbar, Container, Nav } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-3">QuizzerPro</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home" className="fs-5">Home</Nav.Link>
          <Nav.Link href="#features" className="fs-5">Quizzes</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
