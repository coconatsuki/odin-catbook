import React from "react";
import ReactDOM from "react-dom";
import PostsPage from "../src/pages/PostsPage";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<PostsPage />, document.getElementById("posts-container"));
});
