import React from "react";
import FlipMove from "react-flip-move";
import PropTypes from "prop-types";
import { commentType } from "../API/comments";
import { currentUserType } from "../API/users";
import { getComments, destroyComment } from "../API/comments";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import Comment from "./Comment";
import { Counter } from "../styles/comment";
import { Border } from "../styles/global";

class CommentsBlock extends React.Component {
  static propTypes = {
    currentUser: currentUserType,
    commentsCount: PropTypes.number.isRequired,
    postId: PropTypes.number.isRequired
  };

  state = {
    comments: [],
    showComments: false,
    commentsCount: this.props.commentsCount,
    errorMessages: []
  };

  componentDidMount = async () => {
    this.fetchAndDisplayComments();
  };

  fetchAndDisplayComments = async () => {
    const fetchedComments = await getComments(this.props.postId);
    this.setState({
      comments: fetchedComments.comments
    });
  };

  displayNewComment = newComment => {
    const { comments } = this.state;
    this.setState({
      comments: [...comments, newComment],
      commentsCount: this.state.commentsCount + 1
    });
  };

  updateAllComments = updatedComment => {
    const { comments } = this.state;
    const updatedComments = comments.map(comment =>
      comment.id === updatedComment.id ? updatedComment : comment
    );
    this.setState({
      comments: updatedComments,
      commentsCount: updatedComment.length
    });
  };

  deleteComment = async deletedComment => {
    const { comments } = this.state;
    const { postId } = this.props;
    const destroyedComment = await destroyComment(postId, deletedComment.id);

    if (destroyedComment.errors) {
      this.setCommentErrorMessages(destroyedPost.errors);
    } else {
      const filteredComments = comments.filter(
        comment => comment.id !== deletedComment.id
      );
      this.setState({
        comments: filteredComments,
        commentsCount: filteredComments.length
      });
      this.setCommentErrorMessages([]);
    }
  };

  setCommentErrorMessages = message => {
    this.setState({
      errorMessages: [...message]
    });
  };

  toggleComments = () => {
    this.setState({
      showComments: !this.state.showComments
    });
  };

  render() {
    const { comments, commentsCount, errorMessages, showComments } = this.state;
    return (
      comments && (
        <>
          <CommentForm
            postId={this.props.postId}
            displayNewComment={this.displayNewComment}
            updateAllComments={this.updateAllComments}
            errorMessages={errorMessages}
            setCommentErrorMessages={this.setCommentErrorMessages}
          />
          <div className="comments">
            <Counter>
              <button onClick={this.toggleComments}>
                {showComments
                  ? `Hide comments (${commentsCount})`
                  : `View comments (${commentsCount})`}
              </button>
            </Counter>
            {showComments && (
              <>
                <Border />
                <Comments
                  comments={this.state.comments}
                  postId={this.props.postId}
                  currentUser={this.props.currentUser}
                  displayNewComment={this.displayNewComment}
                  updateAllComments={this.updateAllComments}
                  deleteComment={this.deleteComment}
                  errorMessages={errorMessages}
                  setCommentErrorMessages={this.setCommentErrorMessages}
                />
              </>
            )}
          </div>
        </>
      )
    );
  }
}

export default CommentsBlock;
