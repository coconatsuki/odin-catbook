import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import {
  userType,
  currentUserWithFriendsType,
  getUserById
} from "../API/users";
import FriendshipButton from "./FriendshipButton";
import CropCoverPicture from "./CropCoverPicture";
import CropProfilePicture from "./CropProfilePicture";
import FileUpload from "./FileUpload";
import {
  Header,
  CoverPicWrapper,
  CoverPic,
  ProfileNav,
  CroppingBar,
  spinner,
  SpinnerWrapper,
  NavElements,
  ElementWrapper,
  NavCat1,
  NavCat2,
  NavCat3,
  CatPaw,
  ProfilePicWrapper,
  CropProfileWrapper,
  ProfilePicUploadWrapper,
  ProfilePic,
  CoverFooter,
  TopControl
} from "../styles/user";
import { FileUploadWrapper } from "../styles/fileUpload";
import divCat from "../images/div-cat.png";
import divCat2 from "../images/div-cat2.png";
import divCat3 from "../images/div-cat3.png";
import catPaw from "../images/pawprintwhite.png";
import defaultCat from "../images/default-cat-big.png";

class User extends React.Component {
  static propTypes = {
    user: userType.isRequired,
    currentUser: currentUserWithFriendsType.isRequired,
    canSeeProfile: PropTypes.func.isRequired,
    isCurrentUser: PropTypes.func.isRequired,
    toggleDisplay: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired,
    refreshUser: PropTypes.func.isRequired
  };

  state = {
    smallCoverImage: "",
    croppedCoverImage: "",
    smallProfileImage: "",
    croppedProfileImage: "",
    fileCropping: false,
    fileLoading: false
  };

  toggleFileLoading = () => {
    this.setState({
      fileLoading: !this.state.fileLoading
    });
  };

  toggleFileCropping = () => {
    this.setState({
      fileCropping: !this.state.fileCropping
    });
  };

  clearState = () => {
    this.setState({
      smallCoverImage: "",
      croppedCoverImage: "",
      smallProfileImage: "",
      croppedProfileImage: "",
      fileCropping: false,
      fileLoading: false
    });
  };

  updateCoverImages = smallImage => {
    this.setState({
      smallCoverImage: smallImage
    });
  };

  updateProfileImages = smallImage => {
    this.setState({
      smallProfileImage: smallImage
    });
  };

  refreshUser = async userId => {
    this.props.refreshUser(userId);
    this.clearState();
  };

  croppingImage = () =>
    this.state.smallCoverImage || this.state.smallProfileImage;

  render() {
    const {
      user,
      currentUser,
      isCurrentUser,
      canSeeProfile,
      refreshUser,
      display
    } = this.props;
    return (
      <Header>
        {this.state.fileCropping && this.state.smallCoverImage ? (
          <CropCoverPicture
            imageUrl={this.state.smallCoverImage}
            toggleFileCropping={this.toggleFileCropping}
            toggleFileLoading={this.toggleFileLoading}
            clearState={this.clearState}
            refreshUser={this.refreshUser}
            userId={user.id}
          />
        ) : (
          <CoverPicWrapper>
            <CoverPic imageUrl={user.cropped_cover_pic} />

            {this.state.smallProfileImage ? (
              <CropProfileWrapper>
                <CropProfilePicture
                  imageUrl={this.state.smallProfileImage}
                  toggleFileCropping={this.toggleFileCropping}
                  toggleFileLoading={this.toggleFileLoading}
                  clearState={this.clearState}
                  refreshUser={this.refreshUser}
                  userId={user.id}
                />
              </CropProfileWrapper>
            ) : (
              <>
                {this.state.fileLoading ? (
                  <SpinnerWrapper>
                    <ClipLoader
                      css={spinner}
                      sizeUnit={"px"}
                      size={100}
                      color={"white"}
                      loading={this.state.fileLoading}
                    />
                  </SpinnerWrapper>
                ) : (
                  <ProfilePicWrapper>
                    {isCurrentUser() && (
                      <ProfilePicUploadWrapper>
                        <p>EDIT</p>
                        <FileUpload
                          toggleFileLoading={this.toggleFileLoading}
                          toggleFileCropping={this.toggleFileCropping}
                          updateImages={this.updateProfileImages}
                          profile
                        />
                      </ProfilePicUploadWrapper>
                    )}
                    <ProfilePic
                      imageUrl={user.cropped_profile_pic || defaultCat}
                      default={!user.cropped_profile_pic}
                    />
                  </ProfilePicWrapper>
                )}
              </>
            )}
            <TopControl>
              {!isCurrentUser() && (
                <FriendshipButton user={user} refreshUser={refreshUser} />
              )}
              {isCurrentUser() && !this.croppingImage() && (
                <FileUploadWrapper style={{ width: "100%" }} tag="button">
                  Edit Cover Picture
                  <FileUpload
                    toggleFileLoading={this.toggleFileLoading}
                    toggleFileCropping={this.toggleFileCropping}
                    updateImages={this.updateCoverImages}
                  />
                </FileUploadWrapper>
              )}
            </TopControl>
            <CoverFooter>
              <p>{user.name}</p>
            </CoverFooter>
          </CoverPicWrapper>
        )}
        {!this.state.smallCoverImage && (
          <ProfileNav>
            {(isCurrentUser() || canSeeProfile()) && (
              <>
                <ElementWrapper>
                  <NavElements
                    active={display === "posts"}
                    ref={this.postsDiv}
                    disabled={this.state.fileCropping || this.state.fileLoading}
                  >
                    <NavCat1 src={divCat} active={display === "posts"} />
                    <CatPaw
                      src={catPaw}
                      active={display === "posts"}
                      className="paw"
                    />
                    <a
                      href="#"
                      onClick={e => this.props.toggleDisplay("posts", e)}
                    >
                      Timeline
                    </a>
                  </NavElements>
                </ElementWrapper>
                <ElementWrapper>
                  <NavElements
                    active={display === "friends"}
                    ref={this.friendsDiv}
                    disabled={this.state.fileCropping || this.state.fileLoading}
                  >
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
                  <NavElements
                    active={display === "about"}
                    ref={this.aboutPageDiv}
                    disabled={this.state.fileCropping || this.state.fileLoading}
                  >
                    <NavCat3 src={divCat3} active={display === "about"} />
                    <CatPaw
                      src={catPaw}
                      active={display === "about"}
                      className="paw"
                    />
                    <a
                      href="#"
                      onClick={e => this.props.toggleDisplay("about", e)}
                    >
                      About me
                    </a>
                  </NavElements>
                </ElementWrapper>
              </>
            )}
          </ProfileNav>
        )}
      </Header>
    );
  }
}

export default User;
