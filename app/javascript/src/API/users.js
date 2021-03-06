import { addCsrf } from "./helper";
import PropTypes from "prop-types";

export async function getCurrentUser(params) {
  const currentUser = await fetch(`/users/current${params}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const response = await currentUser.json();
  if (response.user.id) {
    return response;
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
  const response = await users.json();
  return response;
}

export async function updateUser(userId, userData) {
  const user = await fetch(`/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      addCsrf({
        user: userData
      })
    )
  });
  const response = await user.json();
  return response;
}

export async function getUserById(id) {
  const user = await fetch(`/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const response = await user.json();
  return response;
}

export async function getStats() {
  const user = await fetch(`/users/stats`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const response = await user.json();
  return response;
}

export const userType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  breed: PropTypes.string,
  birthday: PropTypes.string,
  country: PropTypes.string,
  city: PropTypes.string,
  things_i_like: PropTypes.array,
  things_i_hate: PropTypes.array,
  small_profile_pic: PropTypes.string,
  cropped_profile_pic: PropTypes.string,
  small_cover_pic: PropTypes.string,
  cropped_cover_pic: PropTypes.string,
  friends: PropTypes.array.isRequired,
  is_friend: PropTypes.number,
  sent_friend_request: PropTypes.number,
  received_friend_request: PropTypes.number
});
export const basicUserType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  sent_friend_request: PropTypes.number,
  received_friend_request: PropTypes.number
});

export const currentUserType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  requests_count: PropTypes.number.isRequired
});

export const currentUserWithFriendsType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  received_friend_requests: PropTypes.array.isRequired,
  sent_friend_requests: PropTypes.array.isRequired,
  requests_count: PropTypes.number.isRequired
});

export const currentUserWithRequestsType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  received_pending_friends: PropTypes.array.isRequired,
  requests_count: PropTypes.number.isRequired
});
