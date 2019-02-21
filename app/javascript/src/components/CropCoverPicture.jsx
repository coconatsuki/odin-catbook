import React from "react";
import PropTypes from "prop-types";
import AvatarEditor from "react-avatar-editor";
import { uploadCroppedCoverPicture } from "../API/imageUpload";
import { CoverPicWrapper, CroppingBar } from "../styles/user";
import { LightGreyButton, LightRedButton } from "../styles/button";

class CropCoverPicture extends React.Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    saveCroppedCoverPicture: PropTypes.func.isRequired,
    toggleCropping: PropTypes.func.isRequired
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
    console.log(croppedFile);

    //   const fetchedFile = await this.uploadCroppedCoverPicture(croppedFile);
    //   this.props.saveCroppedCoverPicture(fetchedFile.secure_url);
    //   console.log("file uploaded !");
    // }
    // this.props.toggleCropping();
  };

  onClickSave = async () => {
    const canvas = this.editor.getImage().toDataURL();
    console.log("canvas", canvas);
    let imageURL;
    await fetch(canvas)
      .then(res => res.blob())
      .then(blob => (imageURL = window.URL.createObjectURL(blob)));
    console.log("imageUrl", imageURL);
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
