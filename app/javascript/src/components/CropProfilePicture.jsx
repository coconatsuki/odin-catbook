import React from "react";
import PropTypes from "prop-types";
import AvatarEditor from "react-avatar-editor";
import AbstractCropping from "./AbstractCropping";
import { updateUser } from "../API/users";
import { uploadFile } from "../API/imageUpload";
import { uploadCroppedCoverPicture } from "../API/imageUpload";
import { CoverPicWrapper, CroppingBar } from "../styles/user";
import { LightGreyButton, LightRedButton } from "../styles/button";

class CropProfilePicture extends AbstractCropping {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    toggleFileCropping: PropTypes.func.isRequired,
    toggleFileLoading: PropTypes.func.isRequired,
    refreshUser: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
  };

  assignPictureToUser = async fileUrl => {
    const { userId } = this.props;
    const userData = {
      cropped_cover_pic: fileUrl,
      small_cover_pic: this.props.imageUrl
    };
    const fetchedUser = await updateUser(userId, userData);
    await this.props.refreshUser(userId);
  };

  render() {
    return (
      <>
        <CoverPicWrapper>
          <AvatarEditor
            ref={this.setEditorRef}
            image={this.props.imageUrl}
            width={958}
            height={260}
            border={0}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1}
            rotate={0}
            style={{ position: "absolute" }}
            crossOrigin="anonymous"
          />
        </CoverPicWrapper>
        <CroppingBar>
          <LightRedButton onClick={this.handleSave}>
            Crop picture
          </LightRedButton>
          <LightGreyButton>Cancel</LightGreyButton>
        </CroppingBar>
      </>
    );
  }
}

export default CropProfilePicture;
