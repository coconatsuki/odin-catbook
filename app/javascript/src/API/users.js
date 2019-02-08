// import { addCsrf } from "./helper";
import PropTypes from "prop-types";

// currentUserFetchMethod = data => {
//   if (data === "withFriends") {
//     return "?withFriends=yes";
//   }
//   if (data === "withFriendRequests") {
//     return "?withFriendRequests=yes";
//   }
//   return "";
// };

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

export async function getReceivedRequests(userId) {
  const receivedRequests = await fetch(`/users/${userId}/received_requests`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const response = await receivedRequests.json();
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

export const userType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  birthday: PropTypes.string,
  country: PropTypes.string,
  city: PropTypes.string,
  things_i_like: PropTypes.array.isRequired,
  things_i_hate: PropTypes.array.isRequired,
  small_profile_pic: PropTypes.string,
  large_profile_pic: PropTypes.string,
  small_cover_pic: PropTypes.string,
  large_cover_pic: PropTypes.string,
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
