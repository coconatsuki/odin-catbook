import React from "react";
import ReactDOM from "react-dom";
import UsersPage from "../src/pages/UsersPage";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<UsersPage />, document.getElementById("users-container"));
});