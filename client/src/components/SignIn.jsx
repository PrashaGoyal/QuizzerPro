import React from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

// custom styles
import "../styles/signin.css";

// importing the axios package
const axios = require("axios");

function SignIn() {
  // to display the error msg, if any
  const [errorMsg, setErrorMsg] = React.useState("");
  // to store the redirect status. If signed in successfully, redirects to the home page
  const [redirect, setRedirect] = React.useState(false);

  const cookies = new Cookies();

  // function to handle signin form submission
  function signInHandler(event) {
    event.preventDefault();

    let body = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    // API call to login the user
    axios
      .post("/api/users/signin", body)
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
    <div className="text-center body">
      <main className="form-signin">
        <form onSubmit={signInHandler}>
          <h1 className="h3 mb-4 fw-bold">QuizzerPro</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              name="email"
            />
            <label for="email">Email address</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
            />
            <label for="password">Password</label>
          </div>

          <p className="error">{errorMsg}</p>

          <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
            Sign In
          </button>

          <p className="mt-2">
            Not registered yet? <Link to="/signup">Sign Up.</Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default SignIn;
