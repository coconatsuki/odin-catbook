import React from "react";
import AbstractPostsPage from "./AbstractPostsPage";
// import FriendshipButton from "../components/FriendshipButton";
import { getCurrentUser } from "../API/users";

class FriendRequests extends AbstractPostsPage {
  state = {
    currentUser: null,
    errorMessages: []
  };

  componentDidMount = async () => {
    await this.fetchCurrentUser("?withFriendRequests=yes");
  };

  fetchCurrentUser = async params => {
    const fetchedCurrentUser = await getCurrentUser(params);
    console.log("FETCHED CURRENT USER, params", fetchedCurrentUser, params);
    this.setState({
      currentUser: fetchedCurrentUser ? fetchedCurrentUser.user : null
    });
  };

  render() {
    const { currentUser } = this.state;
    return (
      currentUser && (
        <>
          {currentUser.received_pending_friends.length > 0 ? (
            <h2>These friends sent you a friend request:</h2>
          ) : (
            <h2>You've no friend request at the moment.</h2>
          )}
          <ul>
            {currentUser.received_pending_friends.map(friend => (
              <li key={friend.id}>{friend.name}</li>
            ))}
          </ul>

          {/* <FriendshipButton user={user} updateUser={updateUser} /> */}
        </>
      )
    );
  }
}

export default FriendRequests;
