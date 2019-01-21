import React from "react";
import PropTypes from "prop-types";
import { addPost, updatePost } from "../API/posts";
import { uploadFile } from "../API/imageUpload";

class PostForm extends React.Component {
  static propTypes = {
    refreshPosts: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func,
    postToEdit: PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      author: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      })
    })
  };

  state = {
    body: this.props.postToEdit ? this.props.postToEdit.body : "",
    errorMessages: [],
    image: null,
    largeImage: null
  };

  handleChange = e => {
    this.setState({
      body: e.target.value
    });
  };

  validBody = msg => {
    this.setState({
      errorMessages: []
    });
    if (msg.trim().length > 5) return true;
    if (msg.trim().length === 0) {
      this.setState({
        errorMessages: ["Your message can't be empty."]
      });
      return false;
    }
    this.setState({
      errorMessages: ["Your message is too short."]
    });
    return false;
  };

  savePost = (postData, postToEdit, method) => {
    if (method === "create") {
      return addPost(postData);
    }
    return updatePost(postData, postToEdit.id);
  };

  handleSave = async e => {
    e.preventDefault();
    const { postToEdit } = this.props;
    const method = postToEdit === undefined ? "create" : "update";
    const { body, image, largeImage } = this.state;
    const postData = { body, image, largeImage };
    if (this.validBody(body)) {
      const fetchedPost = await this.savePost(postData, postToEdit, method);
      if (fetchedPost.errors) {
        this.setState({
          errorMessages: fetchedPost.errors
        });
      } else {
        this.props.refreshPosts(fetchedPost.post, method);
        this.setState({
          body: "",
          errorMessages: []
        });
      }
    }
    if (this.props.toggleEdit) this.props.toggleEdit();
  };

  handlePicChange = async e => {
    const files = e.target.files;
    const fetchedFile = await uploadFile(files);
    if (fetchedFile.error) {
      this.setState({
        errorMessages: [fetchedFile.error.message]
      });
    } else {
      this.setState({
        image: fetchedFile.secure_url,
        largeImage: fetchedFile.eager[0].secure_url
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSave}>
        <ul>
          {this.state.errorMessages.map((msg, index) => (
            <li key={`error${index}`} style={{ color: "red" }}>
              {msg}
            </li>
          ))}
        </ul>
        <label htmlFor="body" />
        <textarea
          name="body"
          id="body"
          onChange={this.handleChange}
          value={this.state.body}
        />
        <div className="picture-upload">
          <label htmlFor="postPicture">
            Upload an image for your post:
            <input
              type="file"
              name="file"
              id="postPicture"
              placeholder="Upload an image"
              onChange={this.handlePicChange}
            />
          </label>
          {this.state.image && (
            <img width="200" src={this.state.image} alt="uploaded Preview" />
          )}
        </div>

        <input type="submit" value="Post!" />
      </form>
    );
  }
}

export default PostForm;
