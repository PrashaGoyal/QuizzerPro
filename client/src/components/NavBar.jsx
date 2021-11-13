import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

// Material UI icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function NavBar() {
  return (
    <Navbar>
      <Container>
        <Link to="/" className="navbar-brand">
          <Navbar.Brand className="fw-bold fs-3">QuizzerPro</Navbar.Brand>
        </Link>

        <Nav className="me-auto">
          <Link to="/" className="fs-5 nav-item">
            Home
          </Link>

          <Link to="/quizzes" className="fs-5 nav-item">
            Quizzes
          </Link>
        </Nav>

        {/* Account */}
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