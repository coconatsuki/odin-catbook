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

  state = {
    listCoordinates: { width: 0, height: 0, left: 0, top: 0 },
    displayHighlight: false
  };

  constructor(props) {
    super(props);
    this.postsDiv = React.createRef();
    this.friendsDiv = React.createRef();
    this.aboutDiv = React.createRef();
  }

  componentDidMount = () => {
    this.highlightActiveList();
  };

  highlightActiveList = () => {
    const activeList = this[`${this.props.display}Div`];
    if (!activeList) return;
    this.highlightList(activeList.current);
  };

  highlightList = listToHighlight => {
    const linkCoords = listToHighlight.getBoundingClientRect();
    const listCoordinates = {
      width: linkCoords.width,
      height: linkCoords.height + 1,
      top: linkCoords.top + window.scrollY,
      left: linkCoords.left + window.scrollX
    };
    this.setState({
      listCoordinates,
      displayHighlight: true
    });
  };

  followDiv = e => {
    this.highlightList(e.currentTarget);
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
              <NavElements
                active={display === "posts"}
                onClick={this.followDiv}
                ref={this.postsDiv}
              >
                <a href="#" onClick={() => this.props.toggleDisplay("posts")}>
                  Timeline
                </a>
              </NavElements>
            </ElementWrapper>
            <ElementWrapper>
              <NavElements
                active={display === "friends"}
                onClick={this.followDiv}
                ref={this.friendsDiv}
              >
                <a href="#" onClick={() => this.props.toggleDisplay("friends")}>
                  {user.friends.length}
                  {user.friends.length > 1 ? " Friends" : " Friend"}
                </a>
              </NavElements>
            </ElementWrapper>
            <ElementWrapper>
              <NavElements
                active={display === "about"}
                onClick={this.followDiv}
                ref={this.aboutPageDiv}
              >
                <a href="#" onClick={() => this.props.toggleDisplay("about")}>
                  About me
                </a>
              </NavElements>
            </ElementWrapper>
            <Highlight
              listCoordinates={this.state.listCoordinates}
              displayHighlight={this.state.displayHighlight}
            >
              <NavCat src={divCat} active />
            </Highlight>
          </ProfileNav>
        </Header>
      </>
    );
  }
}

export default User;
