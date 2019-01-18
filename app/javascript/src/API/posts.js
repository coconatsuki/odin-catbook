export async function getPosts() {
  const posts = await fetch("/posts.json", {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const jsonPosts = await posts.json();
  return jsonPosts;
}

export async function addPost(body) {
  const post = await fetch("/posts.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.getElementsByName("csrf-token")[0].content
    },
    body: JSON.stringify({ post: { body } }) // Formate l'objet pour qu'il corresponde à ce qu'attend le controleur => { post: {body: value} }
  });
  const jsonPost = await post.json();
  return jsonPost;
}

export async function updatePost(body, postId) {
  const post = await fetch(`/posts/${postId}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.getElementsByName("csrf-token")[0].content
    },
    body: JSON.stringify({ post: { body } }) // Formate l'objet pour qu'il corresponde à ce qu'attend le controleur => { post: {body: value} }
  });
  const jsonPost = await post.json();
  return jsonPost;
}

export async function destroyPost(postId) {
  const post = await fetch(`/posts/${postId}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.getElementsByName("csrf-token")[0].content
    }
  });
  const jsonPost = await post.json();
  return jsonPost;
}
