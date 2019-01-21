import { addCsrf } from "./helper";

export async function getPosts() {
  const posts = await fetch("/posts", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const jsonPosts = await posts.json();
  return jsonPosts;
}

export async function addPost(body) {
  const post = await fetch("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(addCsrf({ post: { body } })) // Formate l'objet pour qu'il corresponde à ce qu'attend le controleur => { post: {body: value} }
  });
  const jsonPost = await post.json();
  return jsonPost;
}

export async function updatePost(body, postId) {
  const post = await fetch(`/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(addCsrf({ post: { body } })) // Formate l'objet pour qu'il corresponde à ce qu'attend le controleur => { post: {body: value} }
  });
  const jsonPost = await post.json();
  return jsonPost;
}

export async function destroyPost(postId) {
  const post = await fetch(`/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(addCsrf({}))
  });
  const jsonPost = await post.json();
  return jsonPost;
}
