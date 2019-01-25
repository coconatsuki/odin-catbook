import { addCsrf } from "./helper";

export async function uploadFile(files) {
  const data = new FormData();
  data.append("file", files[0]);
  data.append("upload_preset", "catbook");
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/coconatsu/image/upload",
    { method: "POST", body: data }
  );
  const response = await res.json();
  return response;
}

// export async function getCurrentUser() {
//   const currentUser = await fetch("/users/current", {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     }
//   });
//   const jsonCurrentUser = await currentUser.json();
//   if (jsonCurrentUser.current_user.id) {
//     return jsonCurrentUser;
//   }
//   return null;
// }
