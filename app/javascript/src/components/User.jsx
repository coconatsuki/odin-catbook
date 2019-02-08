import React from "react";
import PropTypes from "prop-types";
import { userType, currentUserWithFriendsType } from "../API/users";
import FriendshipButton from "./FriendshipButton";
import {
  Header,
  CoverPic,
  ProfileNav,
  NavElements,
  ElementWrapper,
  NavCat1,
  NavCat2,
  NavCat3,
  CatPaw,
  ProfilePic,
  CoverFooter
} from "../styles/user";
import divCat from "../images/div-cat.png";
import divCat2 from "../images/div-cat2.png";
import divCat3 from "../images/div-cat3.png";
import catPaw from "../images/pawprintwhite.png";
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
            <ElementWrapper>
              <NavElements active={display === "posts"} ref={this.postsDiv}>
                <NavCat1 src={divCat} active={display === "posts"} />
                <CatPaw
                  src={catPaw}
                  active={display === "posts"}
                  className="paw"
                />
                <a href="#" onClick={() => this.props.toggleDisplay("posts")}>
                  Timeline
                </a>
              </NavElements>
            </ElementWrapper>
            <ElementWrapper>
              <NavElements active={display === "friends"} ref={this.friendsDiv}>
                <NavCat2 src={divCat2} active={display === "friends"} />
                <CatPaw
                  src={catPaw}
                  active={display === "friends"}
                  className="paw"
                />
                <a href="#" onClick={() => this.props.toggleDisplay("friends")}>
                  {user.friends.length}
                  {user.friends.length > 1 ? " Friends" : " Friend"}
                </a>
              </NavElements>
            </ElementWrapper>
            <ElementWrapper>
              <NavElements active={display === "about"} ref={this.aboutPageDiv}>
                <NavCat3 src={divCat3} active={display === "about"} />
                <CatPaw
                  src={catPaw}
                  active={display === "about"}
                  className="paw"
                />
                <a href="#" onClick={() => this.props.toggleDisplay("about")}>
                  About me
                </a>
              </NavElements>
            </ElementWrapper>
          </ProfileNav>
        </Header>
      </>
    );
  }
}

export default User;
