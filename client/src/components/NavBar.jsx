import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

// Material UI icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function NavBar() {
  const cookies = new Cookies();

  function signOutHandler() {
    cookies.remove("userName", { path: "/" });
    cookies.remove("role", { path: "/" });

    // redirect to the home page
    window.location.replace("/");
  }

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
        {cookies.get("userName") && (
          <Navbar.Text>Welcome {cookies.get("userName")}!</Navbar.Text>
        )}

        <NavDropdown
          title={<AccountCircleIcon fontSize="large" />}
          id="basic-nav-dropdown account-dropdown"
        >
          <NavDropdown.Item>
            {cookies.get("userName") ? (
              <p onClick={signOutHandler}>Sign Out</p>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}

export default NavBar;
