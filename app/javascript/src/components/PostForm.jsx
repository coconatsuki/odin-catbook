import React from "react";
import PropTypes from "prop-types";
import ErrorsBlock from "./ErrorsBlock";
import { addPost, updatePost } from "../API/posts";
import { uploadFile } from "../API/imageUpload";
import { Form, Textarea, TextareaField } from "../styles/postForm";

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
    image: this.props.postToEdit ? this.props.postToEdit.smallImageUrl : null,
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
      image: null,
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

  removeImage = () => {
    this.setState({
      image: null,
      largeImage: null
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
    const { body, image, largeImage, fileLoading } = this.state;
    const postData = { body, image, largeImage };

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

  handlePicChange = async e => {
    const files = e.target.files;
    this.toggleFileLoading();
    const fetchedFile = await uploadFile(files);

    if (fetchedFile.error) {
      this.setErrorMessages([fetchedFile.error.message]);
    } else {
      this.setState({
        image: fetchedFile.secure_url,
        largeImage: fetchedFile.eager[0].secure_url
      });
    }
    this.toggleFileLoading();
  };

  submitButtonValue = () => {
    if (this.state.fileLoading) return "File loading";
    if (this.isEditing()) return "Edit!";
    return "Post!";
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
            <span className="border" />
          </label>
          <div className="picture-upload">
            <label htmlFor="postPicture">
              <input
                type="file"
                name="file"
                id="postPicture"
                placeholder="Add a Picture"
                onChange={this.handlePicChange}
              />
            </label>
            {this.state.image && (
              <div className="pictureToSave">
                <img
                  width="200"
                  src={this.state.image}
                  alt="uploaded Preview"
                />
                <button onClick={this.removeImage}>Delete this picture</button>
              </div>
            )}
          </div>
        </TextareaField>

        <input
          type="submit"
          value={this.submitButtonValue()}
          disabled={this.state.fileLoading}
        />
        <button onClick={this.props.toggleEdit}>Cancel</button>
      </Form>
    );
  }
}

export default PostForm;
