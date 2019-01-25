import { addCsrf } from "./helper";
import PropTypes from "prop-types";

export async function getComments(postId) {
  const comments = await fetch(`posts/${postId}/comments`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const response = await comments.json();
  return response;
}

export async function addComment(postId, body) {
  const comment = await fetch(`/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      addCsrf({
        comment: {
          body
        }
      })
    )
  });
  const response = await comment.json();
  return response;
}

export async function updateComment(postId, commentId, body) {
  const comment = await fetch(`/posts/${postId}/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      addCsrf({
        comment: {
          body
        }
      })
    )
  });
  const response = await comment.json();
  return response;
}

export async function destroyComment(postId, commentId) {
  const comment = await fetch(`/posts/${postId}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(addCsrf({}))
  });
  const response = await comment.json();
  return response;
}

export const commentType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  author: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })
});
