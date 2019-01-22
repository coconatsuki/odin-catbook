// import { addCsrf } from "./helper";

export async function getCurrentUser() {
  const currentUser = await fetch("/users/current", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const jsonCurrentUser = await currentUser.json();
  if (jsonCurrentUser.current_user.id) {
    return jsonCurrentUser;
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
  const jsonUsers = await users.json();
  return jsonUsers;
}

export async function getUserById(id) {
  const user = await fetch(`/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const jsonUser = await user.json();
  return jsonUser;
}
