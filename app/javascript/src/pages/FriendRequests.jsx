import React from "react";
import AbstractPostsPage from "./AbstractPostsPage";
import FriendshipButton from "../components/FriendshipButton";
import Nav from "../components/Nav";
import { getCurrentUser } from "../API/users";

class FriendRequests extends AbstractPostsPage {
  state = {
    currentUser: null,
    errorMessages: []
  };

  componentDidMount = async () => {
    await this.fetchCurrentUser("?withFriendRequests=yes");
  };

  updateUser = async userId => {
    await this.fetchCurrentUser("?withFriendRequests=yes");
  };

  render() {
    const { currentUser } = this.state;
    return (
      currentUser && (
        <>
          <Nav />
          {currentUser.received_pending_friends.length > 0 ? (
            <h2>These friends sent you a friend request:</h2>
          ) : (
            <h2>You've no friend request at the moment.</h2>
          )}
          <ul>
            {currentUser.received_pending_friends.map(friend => (
              <div className="requesting-friend" key={friend.id}>
                <li>{friend.name} </li>
                <FriendshipButton user={friend} updateUser={this.updateUser} />
              </div>
            ))}
          </ul>

          {/* <FriendshipButton user={user} updateUser={updateUser} /> */}
        </>
      )
    );
  }
}

export default FriendRequests;
