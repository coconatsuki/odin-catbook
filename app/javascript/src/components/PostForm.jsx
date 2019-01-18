import React from "react";
import PropTypes from "prop-types";
import { addPost, updatePost } from "../API/posts";

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
    errorMessages: []
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

  savePost = (body, postToEdit, method) => {
    if (method === "create") {
      return addPost(body);
    }
    return updatePost(body, postToEdit.id);
  };

  handleSave = async e => {
    e.preventDefault();
    const { postToEdit } = this.props;
    const method = postToEdit === undefined ? "create" : "update";
    const body = this.state.body;
    if (this.validBody(body)) {
      const fetchedPost = await this.savePost(body, postToEdit, method);
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
        {/* <input name="file" type="file"
   class="file-upload" data-cloudinary-field="image_id"
   data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"/> */}

        {/* <p>Upload an image :</p> */}
        {/* <%= f.file_field :picture, accept: 'image/jpeg,image/gif,image/png'  %> */}

        <input type="submit" value="Post!" />
      </form>
    );
  }
}

export default PostForm;
