import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// importing react components and stylesheets
import App from "./components/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
