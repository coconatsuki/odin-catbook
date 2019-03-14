import React from "react";
import PropTypes from "prop-types";
import AbstractPage from "./AbstractPage";
import FriendshipButton from "../components/FriendshipButton";
import { currentUserWithRequestsType } from "../API/users";
import {
  FriendsWrapper,
  Main,
  RequestsList,
  RequestItem,
  FriendId,
  Controls
} from "../styles/friendRequests";
import { Aside, CatImg } from "../styles/global";
import requestsCat from "../images/requests-cat.png";
import defaultCat from "../images/default-cat.png";

class FriendRequests extends AbstractPage {
  static propTypes = {
    refreshUser: PropTypes.func.isRequired,
    currentUser: currentUserWithRequestsType.isRequired
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
                  <h1>You received some friend requests:</h1>
                ) : (
                  <h1>No friend request at the moment.</h1>
                )}
                <RequestsList>
                  {currentUser.received_pending_friends.map(friend => (
                    <RequestItem className="requesting-friend" key={friend.id}>
                      <FriendId>
                        <img src={friend.cropped_profile_pic || defaultCat} />
                        <span>{friend.name} </span>
                      </FriendId>
                      <Controls>
                        <FriendshipButton
                          user={friend}
                          refreshUser={this.props.refreshUser}
                        />
                        <FriendshipButton
                          user={friend}
                          refreshUser={this.props.refreshUser}
                          deleteFriendRequest
                        />
                      </Controls>
                    </RequestItem>
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
