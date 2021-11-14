import React from "react";
import { Routes, Route } from "react-router-dom";

// importing react components
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import Quizzes from "./Quizzes";

import EditQuiz from "./EditQuiz";

function Main() {
  return (
    <div>
      <NavBar />
      {/* Routing inside the application */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quizzes/:quizName" element={<EditQuiz />} />
      </Routes>
    </div>
  );
}

export default Main;
