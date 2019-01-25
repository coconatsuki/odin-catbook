import { addCsrf } from "./helper";

export async function addLike(postId) {
  const like = await fetch(`/posts/${postId}/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(addCsrf({}))
  });
  const response = await like.json();
  return response;
}

export async function destroyLike(postId, likeId) {
  const like = await fetch(`/posts/${postId}/likes/${likeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(addCsrf({}))
  });
  const response = await like.json();
  return response;
}
