import React from "react";
import FlipMove from "react-flip-move";
import PropTypes from "prop-types";
import { commentType } from "../API/comments";
import { currentUserType } from "../API/users";
import Comment from "./Comment";

class Comments extends React.Component {
  static propTypes = {
    currentUser: currentUserType,
    postId: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(commentType).isRequired,
    displayNewComment: PropTypes.func.isRequired,
    updateAllComments: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    errorMessages: PropTypes.array.isRequired,
    setCommentErrorMessages: PropTypes.func.isRequired
  };

  render() {
    const {
      comments,
      postId,
      currentUser,
      displayNewComment,
      updateAllComments,
      deleteComment,
      errorMessages,
      setCommentErrorMessages
    } = this.props;
    return (
      comments && (
        <>
          <h6>Comments on this post : </h6>
          <p>--------------------------------------</p>
          <FlipMove>
            {comments.map(comment => (
              <Comment
                key={comment.id}
                comment={comment}
                postId={postId}
                currentUser={currentUser}
                displayNewComment={displayNewComment}
                updateAllComments={updateAllComments}
                deleteComment={deleteComment}
                errorMessages={errorMessages}
                setCommentErrorMessages={setCommentErrorMessages}
              />
            ))}
          </FlipMove>
        </>
      )
    );
  }
}

export default Comments;
