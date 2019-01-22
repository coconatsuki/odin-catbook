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

export async function addPost(postData) {
  console.log("POST DATA FROMM API", postData);
  const post = await fetch("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      addCsrf({
        post: {
          body: postData.body,
          smallImageUrl: postData.image,
          largeImageUrl: postData.largeImage
        }
      })
    ) // Formate l'objet pour qu'il corresponde à ce qu'attend le controleur => { post: {body: value} }
  });
  const jsonPost = await post.json();
  return jsonPost;
}

export async function updatePost(postData, postId) {
  const post = await fetch(`/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      addCsrf({
        post: {
          body: postData.body,
          smallImageUrl: postData.image,
          largeImageUrl: postData.largeImage
        }
      })
    ) // Formate l'objet pour qu'il corresponde à ce qu'attend le controleur => { post: {body: value} }
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
