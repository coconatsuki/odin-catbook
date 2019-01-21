import { addCsrf } from "./helper";

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
