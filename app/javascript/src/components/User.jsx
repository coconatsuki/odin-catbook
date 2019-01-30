import React from "react";
import PropTypes from "prop-types";
import { userType, currentUserWithFriendsType } from "../API/users";
import FriendshipButton from "./FriendshipButton";

class User extends React.Component {
  static propTypes = {
    user: userType.isRequired,
    currentUser: currentUserWithFriendsType.isRequired,
    canSeeProfile: PropTypes.func.isRequired,
    isCurrentUser: PropTypes.func.isRequired,
    toggleDisplayFriends: PropTypes.func.isRequired
  };

  render() {
    const { user, currentUser, isCurrentUser, canSeeProfile } = this.props;
    return (
      <>
        <p>Link to Edit profile here</p>
        <p>PROFILE PIC HERE</p>
        <p>{user.name}</p>
        {canSeeProfile() || isCurrentUser ? (
          <div className="current-user">
            {!isCurrentUser() && <FriendshipButton user={user} />}
            <p>
              <a onClick={this.props.toggleDisplayFriends}>
                {user.friends.length}
                {user.friends.length > 1 ? "FRIENDS" : "FRIEND"}
              </a>
            </p>
          </div>
        ) : (
          <>
            <p>
              <strong>
                If you're not friend with this cat, you can't see its page.
              </strong>
            </p>
            <FriendshipButton user={user} />
          </>
        )}
      </>
    );
  }
}

export default User;
