export async function getCurrentUser() {
  const currentUser = await fetch("/users/current.json", {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const jsonCurrentUser = await currentUser.json();
  if (jsonCurrentUser.current_user.id) {
    return jsonCurrentUser;
  }
  return null;
}
