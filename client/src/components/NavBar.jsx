import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

// Material UI icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function NavBar() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  // to handle SignIn link click
  function signInClickHandler() {
    navigate("../signin");
  }

  // to handle user signout
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
          {cookies.get("userName") ? (
            <NavDropdown.Item onClick={signOutHandler}>
              Sign Out
            </NavDropdown.Item>
          ) : (
            <NavDropdown.Item onClick={signInClickHandler}>
              Sign In
            </NavDropdown.Item>
          )}
        </NavDropdown>
      </Container>
    </Navbar>
  );
}

export default NavBar;
