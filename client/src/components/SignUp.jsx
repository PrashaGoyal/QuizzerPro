import React from "react";
import { Link } from "react-router-dom";

// custom styles
import "../styles/signup.css";

function SignUp() {
  return (
    <div class="text-center body">
      <main class="form-signup">
        <form>
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
