import React from "react";
import { Routes, Route } from "react-router-dom";

// importing react components
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import Quizzes from "./Quizzes";

function Main() {
  return (
    <div>
      <NavBar />
      {/* Routing inside the application */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quizzes" element={<Quizzes />} />
      </Routes>
    </div>
  );
}

export default Main;
