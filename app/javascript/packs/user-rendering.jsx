import React from "react";
import ReactDOM from "react-dom";
import UserPage from "../src/pages/UserPage";

document.addEventListener("turbolinks:load", () => {
  ReactDOM.render(<UserPage />, document.getElementById("user-container"));
});
