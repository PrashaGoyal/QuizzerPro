import React from "react";
import { Link } from "react-router-dom";

// custom styles
import "../styles/signin.css";

function SignIn() {
  return (
    <div class="text-center body">
      <main class="form-signin">
        <form>
          <h1 class="h3 mb-4 fw-bold">QuizzerPro</h1>

          <div class="form-floating">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="name@example.com"
            />
            <label for="email">Email address</label>
          </div>

          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
            />
            <label for="password">Password</label>
          </div>

          <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">
            Sign In
          </button>

          <p class="mt-2">
            Not registered yet? <Link to="/signup">Sign Up.</Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default SignIn;
