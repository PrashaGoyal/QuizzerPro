import React from "react";
import { Routes, Route } from "react-router-dom";

// importing react components
import Main from "./Main";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
  return (
    <div>
      {/* Frontend Routing */}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
