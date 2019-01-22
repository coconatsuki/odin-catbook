import React from "react";
import ReactDOM from "react-dom";
import HomePage from "../src/pages/HomePage";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<HomePage />, document.getElementById("homepage-container"));
});
