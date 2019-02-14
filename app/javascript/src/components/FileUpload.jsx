import React from "react";
import PropTypes from "prop-types";
import ErrorsBlock from "./ErrorsBlock";
import { uploadFile } from "../API/imageUpload";
import { FileUploadButton } from "../styles/postForm";

class FileUpload extends React.Component {
  static propTypes = {
    toggleFileLoading: PropTypes.func.isRequired,
    updateImages: PropTypes.func.isRequired,
    smallImage: PropTypes.string,
    largeImage: PropTypes.string
  };

  state = {
    errorMessages: []
  };

  setErrorMessages = messagesArray => {
    this.setState({
      errorMessages: messagesArray
    });
  };

  handlePicChange = async e => {
    const files = e.target.files;
    this.props.toggleFileLoading();
    const fetchedFile = await uploadFile(files);

    if (fetchedFile.error) {
      this.setErrorMessages([fetchedFile.error.message]);
    } else {
      this.props.updateImages(
        fetchedFile.secure_url,
        fetchedFile.eager[0].secure_url
      );
      console.log("file uploaded !");
    }
    this.props.toggleFileLoading();
  };

  render() {
    const { likedByCurrentUser, likesCount } = this.state;
    return (
      <FileUploadButton>
        {this.state.errorMessages.length > 0 && (
          <ErrorsBlock errorMessages={this.state.errorMessages} />
        )}
        {this.props.smallImage ? (
          <button onClick={() => this.props.updateImages(null, null)}>
            Delete this picture
          </button>
        ) : (
          <input
            style={{ width: "100%" }}
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
