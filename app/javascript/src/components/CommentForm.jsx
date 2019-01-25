import React from "react";
import PropTypes from "prop-types";
import { commentType, addComment, updateComment } from "../API/comments";

class CommentForm extends React.Component {
  static propTypes = {
    displayNewComment: PropTypes.func.isRequired,
    updateAllComments: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func,
    commentToEdit: PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired
    })
  };

  state = {
    body: this.props.commentToEdit ? this.props.commentToEdit.body : "",
    errorMessages: []
  };

  isEditing = () => {
    return this.props.commentToEdit !== undefined;
  };

  handleChange = e => {
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

  createComment = async body => {
    const fetchedComment = await addComment(postId, body);
    if (fetchedComment.errors) {
      return this.setErrorMessages(fetchedComment.errors);
    }
    this.props.displayNewComment(fetchedComment.comment);
    this.clearState();
  };

  editComment = async (body, commentToEditId) => {
    const fetchedComment = await updateComment(postId, commentToEditId, body);
    if (fetchedComment.errors) {
      return this.setErrorMessages(fetchedComment.errors);
    }
    this.clearState();
    if (this.isEditing()) this.props.toggleEdit();
  };

  handleSave = async e => {
    e.preventDefault();
    const { commentToEdit } = this.props;
    const { body } = this.state;
    if (!this.validBody(body)) return;

    if (this.isEditing()) {
      this.createComment(body);
    } else {
      this.editComment(body, commentToEdit.id);
    }
  };

  submitButtonValue = () => {
    if (this.isEditing()) return "Edit comment!";
    return "Post comment!";
  };

  render() {
    return (
      <form onSubmit={this.handleSave}>
        <p>Write a comment...</p>
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
        <input
          type="submit"
          value={this.submitButtonValue()}
          disabled={this.state.fileLoading}
        />
        <button onClick={this.props.toggleEdit}>Cancel</button>
      </form>
    );
  }
}

export default CommentForm;
