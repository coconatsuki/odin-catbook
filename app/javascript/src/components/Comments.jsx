import React from "react";
import FlipMove from "react-flip-move";
import PropTypes from "prop-types";
import { commentType } from "../API/comments";
import { currentUserType } from "../API/users";
import {
  getComments,
  addComment,
  updateComment,
  destroyComment
} from "../API/comments";
import Comment from "./Comment";

class Comments extends React.Component {
  static propTypes = {
    currentUser: currentUserType,
    refreshCommentsCount: PropTypes.func.isRequired,
    postId: PropTypes.number.isRequired
  };

  state = {
    comments: []
  };

  displayNewComment = newComment => {
    this.setState({
      comments: [...comments, newComment]
    });
  };

  updateAllComments = updatedComment => {
    const { comments } = this.state;
    const updatedComments = comments.map(comment =>
      comment.id === updatedComment.id ? updatedComment : post
    );
    this.setState({
      comments: updatedComments
    });
    this.props.refreshCommentsCount("add");
  };

  deleteComment = deletedComment => {
    const { comments } = this.state;
    const filteredComments = comments.filter(
      comment => comment.id !== deletedComment.id
    );
    this.setState({
      comments: filteredComments
    });
    this.props.refreshCommentsCount("delete");
  };

  fetchAndDisplayComments = async () => {
    const fetchedComments = await getPosts(this.props.postId);
    console.log("FETCHED COMMENTS", fetchedComments);
    this.setState({
      comments: fetchedComments.comments
    });
  };

  render() {
    const { comments } = this.state;
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
                currentUser={this.props.currentUser}
                displayNewComment={this.displayNewComment}
                updateAllComments={this.updateAllComments}
                deleteComment={this.deleteComment}
              />
            ))}
          </FlipMove>
        </>
      )
    );
  }
}

export default Comments;
