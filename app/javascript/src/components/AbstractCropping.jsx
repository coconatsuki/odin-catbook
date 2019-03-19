import React from "react";
import PropTypes from "prop-types";
import AvatarEditor from "react-avatar-editor";
import { uploadFile } from "../API/imageUpload";

class AbstractCropping extends React.Component {
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

  handleCancel = () => this.props.clearState();

  handleSave = async () => {
    this.props.toggleFileLoading();
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    const fileName = `image${Math.floor(
      Math.random() * Math.floor(2000000000)
    )}_cropped`;
    const fileType = this.getFileType(img);
    const croppedFile = this.stringToFile(img, fileType, fileName);
    const fetchedFile = await uploadFile([croppedFile]);
    console.log("fetchedFile", fetchedFile);
    this.assignPictureToUser(fetchedFile.secure_url);
    this.props.toggleFileLoading();
    this.props.toggleFileCropping();
  };
}

export default AbstractCropping;
