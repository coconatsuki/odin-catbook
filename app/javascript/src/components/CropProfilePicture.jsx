import React from "react";
import PropTypes from "prop-types";
import AvatarEditor from "react-avatar-editor";
import AbstractCropping from "./AbstractCropping";
import { updateUser } from "../API/users";
import { uploadFile } from "../API/imageUpload";
import { uploadCroppedCoverPicture } from "../API/imageUpload";
import { CoverPicWrapper, ProfileCroppingControls } from "../styles/user";
import { LightGreyButton, LightRedButton } from "../styles/button";

class CropProfilePicture extends AbstractCropping {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    toggleFileCropping: PropTypes.func.isRequired,
    toggleFileLoading: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired,
    refreshUser: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
  };

  assignPictureToUser = async fileUrl => {
    const { userId } = this.props;
    const userData = {
      cropped_profile_pic: fileUrl,
      small_profile_pic: this.props.imageUrl
    };
    const fetchedUser = await updateUser(userId, userData);
    await this.props.refreshUser(userId);
  };

  render() {
    return (
      <>
        <ProfileCroppingControls>
          <LightRedButton onClick={this.handleSave}>Crop</LightRedButton>
          <LightGreyButton onClick={this.handleCancel}>Cancel</LightGreyButton>
        </ProfileCroppingControls>
        <AvatarEditor
          ref={this.setEditorRef}
          image={this.props.imageUrl}
          width={168}
          height={168}
          border={0}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1}
          rotate={0}
          style={{
            position: "absolute",
            bottom: "0",
            borderRadius: "50%",
            backgroundColor: "#b23a48"
          }}
          crossOrigin="anonymous"
        />
      </>
    );
  }
}

export default CropProfilePicture;
