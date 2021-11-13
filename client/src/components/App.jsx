import React from "react";
import { Routes, Route } from "react-router-dom";

// importing react components
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import Quizzes from "./Quizzes";

function App() {
  return (
    <div>
      <NavBar />
      {/* Frontend routing */}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/quizzes" element={<Quizzes />}></Route>
      </Routes>
    </div>
  );
}

export default App;
