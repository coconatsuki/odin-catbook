import React from "react";
import PropTypes from "prop-types";
import AvatarEditor from "react-avatar-editor";
import { updateUser } from "../API/users";
import { uploadFile } from "../API/imageUpload";
import { uploadCroppedCoverPicture } from "../API/imageUpload";
import { CoverPicWrapper, CroppingBar } from "../styles/user";
import { LightGreyButton, LightRedButton } from "../styles/button";

class CropCoverPicture extends React.Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    toggleCropping: PropTypes.func.isRequired,
    refreshUser: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
  };
  setEditorRef = editor => (this.editor = editor);

  stringToFile = (img, fileType, fileName) => {
    const byteString = atob(img.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    // eslint-disable-next-line
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: fileType });
    return new File([blob], fileName);
  };

  getFileType = imgString => {
    const regex = /data:(image[^;]+);/;
    return imgString.match(regex)[1];
  };

  handleSave = async () => {
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    const fileName = `image${Math.floor(
      Math.random() * Math.floor(2000000000)
    )}_cropped`;
    const fileType = this.getFileType(img);
    const croppedFile = this.stringToFile(img, fileType, fileName);
    const fetchedFile = await uploadFile([croppedFile]);
    this.assignPictureToUser(fetchedFile.secure_url);
    this.props.toggleCropping();
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

export default CropCoverPicture;
