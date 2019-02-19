import React from "react";
import PropTypes from "prop-types";
import ErrorsBlock from "./ErrorsBlock";
import FileUpload from "./FileUpload";
import { addPost, updatePost } from "../API/posts";
import { LightGreyButton } from "../styles/button";
import {
  Form,
  Textarea,
  TextareaField,
  FileUploadWrapper,
  PicturePreview,
  ShareButton,
  Controls
} from "../styles/postForm";
import { Border } from "../styles/global";

class PostForm extends React.Component {
  static propTypes = {
    refreshPosts: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func,
    postToEdit: PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired
    })
  };

  state = {
    body: this.props.postToEdit ? this.props.postToEdit.body : "",
    smallImage: this.props.postToEdit
      ? this.props.postToEdit.smallImageUrl
      : null,
    largeImage: this.props.postToEdit
      ? this.props.postToEdit.largeImageUrl
      : null,
    errorMessages: [],
    fileLoading: false
  };

  isEditing = () => {
    return this.props.postToEdit !== undefined;
  };

  handleBodyChange = e => {
    this.setState({
      body: e.target.value
    });
  };

  setErrorMessages = messagesArray => {
    this.setState({
      errorMessages: messagesArray
    });
  };

  clearState = () => {
    this.setState({
      body: "",
      smallImage: null,
      largeImage: null,
      errorMessages: []
    });
  };

  validBody = msg => {
    this.setErrorMessages([]);
    if (msg.trim().length === 0) {
      this.setErrorMessages(["Your message can't be empty."]);
      return false;
    }
    if (msg.trim().length <= 5) {
      this.setErrorMessages(["Your message is too short."]);
      return false;
    }
    return true;
  };

  updateImages = (smallImage, largeImage) => {
    this.setState({
      smallImage,
      largeImage
    });
  };

  savePost = (postData, postToEdit, method) => {
    if (method === "create") {
      return addPost(postData);
    }
    return updatePost(postData, postToEdit.id);
  };

  updateState = (fetchedPost, method) => {
    if (fetchedPost.errors) {
      this.setErrorMessages(fetchedPost.errors);
    } else {
      this.props.refreshPosts(fetchedPost.post, method);
      this.clearState();
    }
  };

  handleSave = async e => {
    e.preventDefault();
    const { postToEdit } = this.props;
    const method = this.isEditing() ? "update" : "create";
    const { body, smallImage, largeImage, fileLoading } = this.state;
    const postData = { body, smallImage, largeImage };

    if (this.validBody(body) && !fileLoading) {
      const fetchedPost = await this.savePost(postData, postToEdit, method);
      this.updateState(fetchedPost, method);
    }
    if (this.isEditing()) this.props.toggleEdit();
  };

  toggleFileLoading = () => {
    this.setState({
      fileLoading: !this.state.fileLoading
    });
  };

  submitButtonValue = () => {
    if (this.state.fileLoading) return "File loading";
    if (this.isEditing()) return "Edit!";
    return "Share!";
  };

  render() {
    return (
      <Form onSubmit={this.handleSave}>
        {this.state.errorMessages.length > 0 && (
          <ErrorsBlock errorMessages={this.state.errorMessages} />
        )}
        <TextareaField>
          <label htmlFor="body">
            <span className="label">What's in your mind today?</span>
            <Textarea
              placeholder="Prrrrrr..."
              name="body"
              id="body"
              onChange={this.handleBodyChange}
              value={this.state.body}
            />
            <Border />
          </label>
          <FileUploadWrapper>
            {this.state.smallImage ? "Delete this image" : "Upload an Image"}
            <FileUpload
              toggleFileLoading={this.toggleFileLoading}
              smallImage={this.state.smallImage}
              largeImage={this.state.largeImage}
              updateImages={this.updateImages}
            />
          </FileUploadWrapper>
          {this.state.smallImage && (
            <PicturePreview>
              <img
                width="200"
                src={this.state.smallImage}
                alt="uploaded Preview"
              />
            </PicturePreview>
          )}
        </TextareaField>
        <Controls edit={this.isEditing()}>
          <ShareButton type="submit" disabled={this.state.fileLoading}>
            {this.submitButtonValue()}
          </ShareButton>
          {this.isEditing() && (
            <LightGreyButton onClick={this.props.toggleEdit}>
              Cancel
            </LightGreyButton>
          )}
        </Controls>
      </Form>
    );
  }
}

export default PostForm;
