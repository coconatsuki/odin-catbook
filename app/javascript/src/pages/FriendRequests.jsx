import React from "react";
import PropTypes from "prop-types";
import AbstractPage from "./AbstractPage";
import FriendshipButton from "../components/FriendshipButton";
import { currentUserWithFriendsType } from "../API/users";
import { FriendsWrapper, Main, RequestsList } from "../styles/friendRequests";
import { Aside, CatImg } from "../styles/global";
import requestsCat from "../images/requests-cat.png";

class FriendRequests extends AbstractPage {
  static propTypes = {
    refreshUser: currentUserWithFriendsType.isRequired,
    currentUser: PropTypes.func.isRequired
  };

  state = {
    errorMessages: []
  };

  render() {
    const { currentUser } = this.props;
    return (
      <>
        {currentUser && (
          <div>
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
                        refreshUser={this.props.refreshUser}
                      />
                      <FriendshipButton
                        user={friend}
                        refreshUser={this.props.refreshUser}
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
