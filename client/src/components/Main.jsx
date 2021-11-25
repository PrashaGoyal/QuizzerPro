import React from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "universal-cookie";

// importing react components
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import Quizzes from "./Quizzes";

import EditQuiz from "./EditQuiz";
import AttemptQuiz from "./AttemptQuiz";
import QuizAssignees from "./QuizAssignees";

function Main() {
  const cookies = new Cookies();

  return (
    <div>
      <NavBar />
      {/* Routing inside the application */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route
          path="/quizzes/:quizName"
          element={
            cookies.get("role") === "Teacher" ? <EditQuiz /> : <AttemptQuiz />
          }
        />
        <Route
          path="/quizzes/:quizName/assignees"
          element={<QuizAssignees />}
        />
      </Routes>
    </div>
  );
}

export default Main;
