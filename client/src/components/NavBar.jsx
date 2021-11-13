import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

// Material UI icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function NavBar() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-3">
          QuizzerPro
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home" className="fs-5 nav-item">
            Home
          </Nav.Link>
          <Nav.Link href="#features" className="fs-5 nav-item">
            Quizzes
          </Nav.Link>
        </Nav>
        <NavDropdown
          title={<AccountCircleIcon fontSize="large" />}
          id="basic-nav-dropdown account-dropdown"
        >
          <NavDropdown.Item href="#action/3.1">Sign In</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}

export default NavBar;
