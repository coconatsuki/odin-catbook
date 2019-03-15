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
  Controls,
  RequestsPageAside
} from "../styles/friendRequests";
import { CatImg } from "../styles/global";
import requestsCatLeft from "../images/requests-cat-left.png";
import requestsCatRight from "../images/requests-cat-right.png";
import defaultCat from "../images/default-cat-small.png";

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
              <RequestsPageAside className="left-aside">
                <CatImg src={requestsCatLeft} />
              </RequestsPageAside>
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
              <RequestsPageAside className="right-aside" right>
                <CatImg src={requestsCatRight} />
              </RequestsPageAside>
            </FriendsWrapper>
          </div>
        )}
      </>
    );
  }
}

export default FriendRequests;
