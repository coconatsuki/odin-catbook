import { addCsrf } from "./helper";
import PropTypes from "prop-types";

export async function getPosts() {
  const posts = await fetch("/posts", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const response = await posts.json();
  return response;
}

export async function addPost(postData) {
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
    )
  });
  const response = await post.json();
  return response;
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
    )
  });
  const response = await post.json();
  return response;
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
  const response = await post.json();
  return response;
}

export const postType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  smallImageUrl: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  // likes: PropTypes.array.isRequired,
  likes_count: PropTypes.number.isRequired,
  liked_by_current_user: PropTypes.number,
  author: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })
});
