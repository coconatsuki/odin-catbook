import React from "react";
import PropTypes from "prop-types";
import { userType, currentUserWithFriendsType } from "../API/users";
import FriendshipButton from "./FriendshipButton";
import {
  Header,
  CoverPic,
  ProfileNav,
  NavElements,
  ProfilePic,
  CoverFooter
} from "../styles/user";
import { LightGreyButton } from "../styles/global";

class User extends React.Component {
  static propTypes = {
    user: userType.isRequired,
    currentUser: currentUserWithFriendsType.isRequired,
    canSeeProfile: PropTypes.func.isRequired,
    isCurrentUser: PropTypes.func.isRequired,
    toggleDisplay: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired
  };

  render() {
    const {
      user,
      currentUser,
      isCurrentUser,
      canSeeProfile,
      updateUser
    } = this.props;
    return (
      <>
        <Header>
          <CoverPic>
            <ProfilePic />
            <CoverFooter>
              <p>{user.name}</p>
              {!isCurrentUser() && (
                <FriendshipButton user={user} updateUser={updateUser} />
              )}
              {isCurrentUser() && (
                <LightGreyButton>Edit Profile</LightGreyButton>
              )}
            </CoverFooter>
          </CoverPic>
          <ProfileNav>
            <NavElements>
              <a href="#" onClick={() => this.props.toggleDisplay("posts")}>
                Timeline
              </a>
            </NavElements>
            <NavElements>
              <a href="#" onClick={() => this.props.toggleDisplay("friends")}>
                {user.friends.length}
                {user.friends.length > 1 ? " Friends" : " Friend"}
              </a>
            </NavElements>
            <NavElements>
              <a href="#">About me</a>
            </NavElements>
          </ProfileNav>
        </Header>
      </>
    );
  }
}

export default User;
