import React from "react";
import PropTypes from "prop-types";
import { commentType, addComment, updateComment } from "../API/comments";
import ErrorsBlock from "./ErrorsBlock";
import { Textarea, EditComment } from "../styles/comment";
import { Controls } from "../styles/postForm";
import { LightGreyButton } from "../styles/button";

class CommentForm extends React.Component {
  static propTypes = {
    displayNewComment: PropTypes.func.isRequired,
    updateAllComments: PropTypes.func.isRequired,
    postId: PropTypes.number.isRequired,
    toggleEdit: PropTypes.func,
    commentToEdit: PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired
    }),
    errorMessages: PropTypes.array.isRequired,
    setCommentErrorMessages: PropTypes.func.isRequired,
    fetchStats: PropTypes.func
  };

  state = {
    body: this.props.commentToEdit ? this.props.commentToEdit.body : ""
  };

  isEditing = () => {
    return this.props.commentToEdit !== undefined;
  };

  handleChange = e => {
    this.setState({
      body: e.target.value
    });
  };

  clearState = () => {
    this.setState({
      body: ""
    });
  };

  validBody = msg => {
    const { setCommentErrorMessages } = this.props;
    setCommentErrorMessages([]);
    if (msg.trim().length === 0) {
      setCommentErrorMessages(["Your message can't be empty."]);
      return false;
    }
    if (msg.trim().length <= 5) {
      setCommentErrorMessages(["Your message is too short."]);
      return false;
    }
    return true;
  };

  createComment = async body => {
    const { postId, setCommentErrorMessages } = this.props;
    const fetchedComment = await addComment(postId, body);
    if (fetchedComment.errors) {
      return setCommentErrorMessages(fetchedComment.errors);
    }
    this.props.displayNewComment(fetchedComment.comment);
    this.props.fetchStats();
  };

  editComment = async (body, commentToEditId) => {
    const { postId, updateAllComments, setCommentErrorMessages } = this.props;
    const fetchedComment = await updateComment(postId, commentToEditId, body);
    if (fetchedComment.errors) {
      return setCommentErrorMessages(fetchedComment.errors);
    }
    updateAllComments(fetchedComment.comment);
  };

  handleSave = async e => {
    e.preventDefault();
    const { body } = this.state;
    if (!this.validBody(body)) return;

    if (this.isEditing()) {
      const { commentToEdit } = this.props;
      this.editComment(body.trim(), commentToEdit.id);
    } else {
      this.createComment(body.trim());
    }
    this.clearState();
    this.props.setCommentErrorMessages([]);
    if (this.isEditing()) this.props.toggleEdit();
  };

  submitButtonValue = () => {
    if (this.isEditing()) return "Edit comment!";
    return "Post comment!";
  };

  render() {
    return (
      <form onSubmit={this.handleSave}>
        <ErrorsBlock errorMessages={this.props.errorMessages} />
        <label htmlFor="body" />
        <Textarea
          type="text"
          placeholder="Write a comment..."
          name="body"
          id="body"
          onChange={this.handleChange}
          value={this.state.body}
        />
        {this.isEditing() && (
          <Controls edit={this.isEditing()}>
            <EditComment type="submit" value={this.submitButtonValue()}>
              {this.submitButtonValue()}
            </EditComment>

            <LightGreyButton onClick={this.props.toggleEdit}>
              Cancel
            </LightGreyButton>
          </Controls>
        )}
      </form>
    );
  }
}

export default CommentForm;
