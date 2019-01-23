// import { addCsrf } from "./helper";

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
  const jsonCurrentUser = await currentUser.json();
  console.log("FROM API", jsonCurrentUser);
  if (jsonCurrentUser.user.id) {
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
