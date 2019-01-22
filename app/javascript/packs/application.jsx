import React from "react";
import ReactDOM from "react-dom";
import App from "../src/App";

document.addEventListener("turbolinks:load", () => {
  ReactDOM.render(<App />, document.getElementById("app-container"));
});
