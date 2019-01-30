import { addCsrf } from "./helper";
import PropTypes from "prop-types";

export async function sendFriendRequest(user) {
  const friendRequest = await fetch("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      addCsrf({
        friendship: {
          requested: user
        }
      })
    )
  });
  if (response.ok) {
    return {};
  } else {
    const response = await friendRequest.json();
    return response;
  }
}

export async function acceptFriendRequest(friendShipId) {
  const friendship = await fetch(`/friendships/${friendshipId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      addCsrf({
        friendship: {
          id: friendShipId
        }
      })
    )
  });
  if (response.ok) {
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
          id: friendShipId
        }
      })
    )
  });
  if (response.ok) {
    return {};
  } else {
    const response = await friendship.json();
    return response;
  }
}
