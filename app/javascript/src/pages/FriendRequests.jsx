import React from "react";
import AbstractPage from "./AbstractPage";
import FriendshipButton from "../components/FriendshipButton";
import Nav from "../components/Nav";
import { getCurrentUser } from "../API/users";
import { Body } from "../styles/global";
import { FriendsWrapper, Main, RequestsList } from "../styles/friendRequests";
import { Aside, CatImg } from "../styles/global";
import requestsCat from "../images/requests-cat.png";

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
            <FriendsWrapper>
              <Aside className="left-aside">
                <CatImg src={requestsCat} />
              </Aside>
              <Main>
                {currentUser.received_pending_friends.length > 0 ? (
                  <h1>These friends sent you a friend request:</h1>
                ) : (
                  <h1>No friend request at the moment.</h1>
                )}
                <RequestsList>
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
                </RequestsList>
              </Main>
              <Aside className="left-aside" />
            </FriendsWrapper>
          </div>
        )}
      </>
    );
  }
}

export default FriendRequests;
