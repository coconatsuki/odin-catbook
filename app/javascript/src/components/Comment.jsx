import React from "react";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";
import { commentType } from "../API/comments";
import { currentUserType } from "../API/users";
import * as moment from "moment";
import {
  Article,
  CommentControls,
  CommentHeader,
  CommentBody
} from "../styles/comment";

class Comment extends React.Component {
  static propTypes = {
    comment: commentType.isRequired,
    postId: PropTypes.number.isRequired,
    currentUser: currentUserType,
    displayNewComment: PropTypes.func.isRequired,
    updateAllComments: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    errorMessages: PropTypes.array.isRequired,
    setCommentErrorMessages: PropTypes.func.isRequired
  };

  state = {
    edit: false,
    errorMessages: []
  };

  currentUserIsAuthor = () => {
    const { currentUser, comment } = this.props;
    return currentUser && comment.author.id === currentUser.id;
  };

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  render() {
    const {
      comment,
      currentUser,
      displayNewComment,
      updateAllComments,
      deleteComment,
      postId,
      errorMessages,
      setCommentErrorMessages
    } = this.props;
    return (
      <>
        {this.state.edit ? (
          <CommentForm
            postId={postId}
            displayNewComment={displayNewComment}
            updateAllComments={updateAllComments}
            commentToEdit={comment}
            toggleEdit={this.toggleEdit}
            errorMessages={errorMessages}
            setCommentErrorMessages={setCommentErrorMessages}
          />
        ) : (
          <Article>
            {this.currentUserIsAuthor() && (
              <div className="controls">
                <ul>
                  {this.state.errorMessages.map((msg, index) => (
                    <li key={`error${index}`} style={{ color: "red" }}>
                      {msg}
                    </li>
                  ))}
                </ul>
                <CommentControls>
                  <button onClick={this.toggleEdit}>Edit Comment</button>
                  <button onClick={() => deleteComment(comment)}>
                    Delete Comment
                  </button>
                </CommentControls>
              </div>
            )}
            <CommentHeader>
              <h4>{comment.author.name}</h4>
              <span>
                Posted {moment(comment.created_at, "YYYY-MM-DD").fromNow()}
              </span>
            </CommentHeader>

            <CommentBody>{comment.body}</CommentBody>
          </Article>
        )}
      </>
    );
  }
}

export default Comment;
