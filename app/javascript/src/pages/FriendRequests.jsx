import React from "react";
import AbstractPage from "./AbstractPage";
import FriendshipButton from "../components/FriendshipButton";
import Nav from "../components/Nav";
import { getCurrentUser } from "../API/users";
import { Body } from "../styles/global";

class FriendRequests extends AbstractPage {
  state = {
    currentUser: null,
    errorMessages: []
  };

  componentDidMount = async () => {
    this.refreshUser();
  };

  refreshUser = async () => {
    const currentUser = await getCurrentUser("?withFriendRequests=yes");
    console.log(currentUser);
    this.setState({
      currentUser: currentUser.user
    });
  };

  render() {
    const { currentUser } = this.state;
    return (
      <>
        <Body />
        {currentUser && (
          <div>
            <Nav currentUser={currentUser} activePage="requestsPage" />
            {currentUser.received_pending_friends.length > 0 ? (
              <h2>These friends sent you a friend request:</h2>
            ) : (
              <h2>You've no friend request at the moment.</h2>
            )}
            <ul>
              {currentUser.received_pending_friends.map(friend => (
                <div className="requesting-friend" key={friend.id}>
                  <li>{friend.name} </li>
                  <FriendshipButton
                    user={friend}
                    refreshUser={this.refreshUser}
                  />
                  <FriendshipButton
                    user={friend}
                    refreshUser={this.refreshUser}
                    deleteFriendRequest
                  />
                </div>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }
}

export default FriendRequests;
