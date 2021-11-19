import React from "react";
import Cookies from "universal-cookie";

// import react components
import QuizzesStatic from "./QuizzesStatic";
import QuizzesTeacher from "./QuizzesTeacher";
import QuizzesStudent from "./QuizzesStudent";

function Quizzes() {
  const cookies = new Cookies();

  return (
    <div>
      {/* If not logged in, display the static page directing to log-in. */}
      {console.log(cookies.get("role"))}
      {!cookies.get("role") && <QuizzesStatic />}
      {/* If logged in as a 'Teacher', show the teacher's dashboard. */}
      {cookies.get("role") === "Teacher" && <QuizzesTeacher />}
      {/* If logged in as a 'Student', show the student's dashboard. */}
      {cookies.get("role") === "Student" && <QuizzesStudent />}
    </div>
  );
}

export default Quizzes;
