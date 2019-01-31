import { addCsrf } from "./helper";
import PropTypes from "prop-types";

export async function createFriendRequest(user) {
  const friendRequest = await fetch("/friendships", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      addCsrf({
        friendship: {
          requested_id: user.id
        }
      })
    )
  });
  if (friendRequest.ok) {
    return {};
  } else {
    const response = await friendRequest.json();
    return response;
  }
}

export async function updateFriendRequest(friendshipId) {
  console.log("FROM API", friendshipId);
  const friendship = await fetch(`/friendships/${friendshipId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      addCsrf({
        friendship: {
          id: friendshipId
        }
      })
    )
  });
  if (friendship.ok) {
    return {};
  } else {
    const response = await friendship.json();
    return response;
  }
}

export async function destroyFriendship(friendshipId) {
  const friendship = await fetch(`/friendships/${friendshipId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      addCsrf({
        friendship: {
          id: friendshipId
        }
      })
    )
  });
  if (friendship.ok) {
    return {};
  } else {
    const response = await friendship.json();
    return response;
  }
}
