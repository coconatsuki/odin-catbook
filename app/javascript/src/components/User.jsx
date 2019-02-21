import React from "react";
import PropTypes from "prop-types";
import { userType, currentUserWithFriendsType } from "../API/users";
import FriendshipButton from "./FriendshipButton";
import FileUpload from "./FileUpload";
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
  CoverFooter,
  TopControl
} from "../styles/user";
import { FileUploadWrapper } from "../styles/fileUpload";
import divCat from "../images/div-cat.png";
import divCat2 from "../images/div-cat2.png";
import divCat3 from "../images/div-cat3.png";
import catPaw from "../images/pawprintwhite.png";
import { LightGreyButton } from "../styles/button";

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
    smallCoverImage: this.props.user.small_cover_pic,
    largeCoverImage: this.props.user.large_cover_pic,
    smallProfileImage: this.props.user.small_profile_pic,
    largeProfileImage: this.props.user.large_profile_pic,
    fileLoading: false
  };

  toggleFileLoading = () => {
    this.setState({
      fileLoading: !this.state.fileLoading
    });
  };

  updateCoverImages = (smallImage, largeImage) => {
    this.setState({
      smallCoverImage: smallImage,
      largeCoverImage: largeImage
    });
  };

  updateProfileImages = (smallImage, largeImage) => {
    this.setState({
      smallProfileImage: smallImage,
      largeProfileImage: largeImage
    });
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
          <CoverPic imageUrl={this.state.smallCoverImage}>
            <ProfilePic />
            <TopControl>
              {!isCurrentUser() && (
                <FriendshipButton user={user} updateUser={updateUser} />
              )}
              {isCurrentUser() && (
                <FileUploadWrapper style={{ width: "100%" }}>
                  Edit Cover Picture
                  <FileUpload
                    toggleFileLoading={this.toggleFileLoading}
                    smallImage={this.state.smallCoverImage}
                    largeImage={this.state.largeCoverImage}
                    updateImages={this.updateCoverImages}
                  />
                </FileUploadWrapper>
              )}
            </TopControl>
            <CoverFooter>
              <p>{user.name}</p>
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
                <a href="#" onClick={e => this.props.toggleDisplay("posts", e)}>
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
                <a
                  href="#"
                  onClick={e => this.props.toggleDisplay("friends", e)}
                >
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
                <a href="#" onClick={e => this.props.toggleDisplay("about", e)}>
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
