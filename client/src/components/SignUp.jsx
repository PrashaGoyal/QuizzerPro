import React from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

// custom styles
import "../styles/signup.css";

// importing the axios package
const axios = require("axios");

function SignUp() {
  // to display the error msg, if any
  const [errorMsg, setErrorMsg] = React.useState("");
  // to store the redirect status. If signed in successfully, redirects to the home page
  const [redirect, setRedirect] = React.useState(false);

  const cookies = new Cookies();

  // function to handle signup form submission
  function signUpHandler(event) {
    event.preventDefault();

    let body = {
      userName: event.target.userName.value,
      email: event.target.email.value,
      password: event.target.password.value,
      role: event.target.role.value,
    };

    // API call to register the user
    axios
      .post("/api/users/signup", body)
      .then(function (res) {
        if (!res.data.success) setErrorMsg(res.data.message);
        else {
          // set user cookie
          cookies.set("userName", res.data.user.userName, { path: "/" });
          cookies.set("role", res.data.user.role, { path: "/" });

          // to redirect to home page
          setRedirect(true);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  if (redirect) return <Navigate to="/" />;

  return (
    <div class="text-center body">
      <main class="form-signup">
        <form onSubmit={signUpHandler}>
          <h1 class="h3 mb-4 fw-bold">QuizzerPro</h1>

          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="xyz"
              name="userName"
            />
            <label for="username">Username</label>
          </div>

          <div class="form-floating">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="name@example.com"
              name="email"
            />
            <label for="email">Email address</label>
          </div>

          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              name="password"
            />
            <label for="password">Password</label>
          </div>

          <div class="form-floating">
            <select
              class="form-select dropdown"
              aria-label="Default select example"
              name="role"
            >
              <option selected>Select Role</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>

          <p class="error">{errorMsg}</p>

          <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">
            Sign Up
          </button>

          <p class="mt-2">
            Already registered? <Link to="/signin">Sign In.</Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default SignUp;
