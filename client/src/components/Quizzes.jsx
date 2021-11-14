import React from "react";

// import react components
// import QuizzesStatic from "./QuizzesStatic";
import QuizzesTeacher from "./QuizzesTeacher";
// import QuizzesStudent from "./QuizzesStudent";

function Quizzes() {
  return (
    //   If not logged in, display the static page directing to log-in.
    // <QuizzesStatic />

    // If logged in as a 'Teacher', show the teacher's dashboard.
    <QuizzesTeacher/>

    // If logged in as a 'Student', show the student's dashboard.
    // <QuizzesStudent />
  );
}

export default Quizzes;
