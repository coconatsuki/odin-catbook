import React from "react";
import PropTypes from "prop-types";
import ErrorsBlock from "./ErrorsBlock";
import { uploadFile } from "../API/imageUpload";
import { FileUploadButton } from "../styles/postForm";

class FileUpload extends React.Component {
  static propTypes = {
    toggleFileLoading: PropTypes.func.isRequired,
    toggleFileCropping: PropTypes.func,
    setErrorMessages: PropTypes.func.isRequired,
    updateImages: PropTypes.func.isRequired,
    smallImage: PropTypes.string,
    profile: PropTypes.bool
  };

  validFile = file => {
    if (file.size > 5000000) {
      console.log("FILE TOO BIG");
      this.props.setErrorMessages([
        "Sorry, this file is too big. Maximum size is 5 MO."
      ]);
      return false;
    }
    const authorizedFormats = ["image/jpg", "image/jpeg", "image/png"];
    if (!authorizedFormats.includes(String(file.type))) {
      console.log("NOT AUTHORIZED FORMAT");
      this.props.setErrorMessages([
        "Sorry, this format is not authorized. Please use a jpeg or png."
      ]);
      return false;
    }
    return true;
  };

  handlePicChange = async e => {
    const files = e.target.files;
    console.log("FILE before upload", files[0]);
    if (!this.validFile(files[0])) return;
    this.props.toggleFileLoading();
    const fetchedFile = await uploadFile(files);
    console.log("fetchedFile", fetchedFile);

    if (fetchedFile.error) {
      this.props.setErrorMessages([fetchedFile.error.message]);
    } else {
      this.props.updateImages(fetchedFile.secure_url);
    }
    this.props.toggleFileLoading();
    if (this.props.toggleFileCropping) this.props.toggleFileCropping();
  };

  render() {
    return (
      <FileUploadButton profile={this.props.profile ? "true" : "false"}>
        {this.props.smallImage ? (
          <button onClick={() => this.props.updateImages(null, null)}>
            Delete this picture
          </button>
        ) : (
          <input
            style={{ width: "100%", cursor: "pointer" }}
            type="file"
            name="file"
            id="postPicture"
            placeholder="Add a Picture"
            onChange={this.handlePicChange}
          />
        )}
      </FileUploadButton>
    );
  }
}

export default FileUpload;
