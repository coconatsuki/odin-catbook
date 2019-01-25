// import { addCsrf } from "./helper";
import PropTypes from "prop-types";

export async function getCurrentUser(data) {
  const currentUser = await fetch(
    `/users/current${data === "withFriends" ? "?withFriends=yes" : ""}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }
  );
  const response = await currentUser.json();
  if (response.user.id) {
    return response;
  }
  return null;
}

export async function getUsers() {
  const users = await fetch("/users", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const response = await users.json();
  return response;
}

export async function getUserById(id) {
  const user = await fetch(`/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const response = await user.json();
  return response;
}

export const currentUserType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
});
