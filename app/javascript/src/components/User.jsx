import React from "react";
import PropTypes from "prop-types";
import { userType, currentUserWithFriendsType } from "../API/users";
import FriendshipButton from "./FriendshipButton";
import {
  Header,
  CoverPic,
  ProfileNav,
  NavElements,
  NavCat,
  ProfilePic,
  CoverFooter,
  Highlight
} from "../styles/user";
import divCat from "../images/div-cat.png";
import { LightGreyButton } from "../styles/global";

class User extends React.Component {
  static propTypes = {
    user: userType.isRequired,
    currentUser: currentUserWithFriendsType.isRequired,
    canSeeProfile: PropTypes.func.isRequired,
    isCurrentUser: PropTypes.func.isRequired,
    toggleDisplay: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired,
    updateUser: PropTypes.func.isRequired
  };

  render() {
    const {
      user,
      currentUser,
      isCurrentUser,
      canSeeProfile,
      updateUser,
      display
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
            <NavElements active={display === "posts"}>
              <NavCat src={divCat} active={display === "posts"} />
              <a href="#" onClick={() => this.props.toggleDisplay("posts")}>
                Timeline
              </a>
            </NavElements>
            <NavElements active={display === "friends"}>
              <NavCat src={divCat} active={display === "friends"} />
              <a href="#" onClick={() => this.props.toggleDisplay("friends")}>
                {user.friends.length}
                {user.friends.length > 1 ? " Friends" : " Friend"}
              </a>
            </NavElements>
            <NavElements active={display === "about"}>
              <NavCat src={divCat} active={display === "about"} />
              <a href="#">About me</a>
            </NavElements>
          </ProfileNav>
        </Header>
      </>
    );
  }
}

export default User;
