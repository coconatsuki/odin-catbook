import React from "react";
import ReactDOM from "react-dom";
import FriendRequests from "../src/pages/FriendRequests";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <FriendRequests />,
    document.getElementById("friend-requests-container")
  );
});
