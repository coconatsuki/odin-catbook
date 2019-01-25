import React from "react";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import { addLike, destroyLike } from "../API/likes";
import { postType } from "../API/posts";
import { currentUserType } from "../API/users";
import * as moment from "moment";

class Post extends React.Component {
  static propTypes = {
    post: postType.isRequired,
    currentUser: currentUserType,
    refreshPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    errorMessages: PropTypes.array.isRequired
  };

  state = {
    edit: false,
    likesCount: this.props.post.likes_count,
    likedByCurrentUser: this.props.post.liked_by_current_user
  };

  componentDidMount = () => {
    this.setState({
      likes: this.props.post.likes
    });
  };

  currentUserIsAuthor = () => {
    const { currentUser, post } = this.props;
    return currentUser && post.author.id === currentUser.id;
  };

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  setErrorMessages = messagesArray => {
    this.setState({
      errorMessages: messagesArray
    });
  };

  clearErrorMessages = () => {
    this.setErrorMessages([]);
  };

  refreshLikes = (likeToChange, method) => {
    switch (method) {
      case "create":
        this.setState({
          likesCount: this.state.likesCount + 1,
          likedByCurrentUser: likeToChange.id,
          errorMessages: []
        });
        break;

      case "delete":
        this.setState({
          likesCount: this.state.likesCount - 1,
          likedByCurrentUser: null,
          errorMessages: []
        });
        break;
    }
  };

  updateLikes = (fetchedLike, method) => {
    if (fetchedLike.errors) return this.setErrorMessages(fetchedLike.errors);
    this.refreshLikes(fetchedLike.like, method);
  };

  likePost = async () => {
    const { post } = this.props;
    const fetchedLike = await addLike(post.id);
    this.updateLikes(fetchedLike, "create");
  };

  unlikePost = async () => {
    const { post, currentUser } = this.props;
    const likeId = this.state.likedByCurrentUser;
    const fetchedLike = await destroyLike(post.id, likeId);
    this.updateLikes(fetchedLike, "delete");
  };

  toggleLike = () => {
    if (this.state.likedByCurrentUser) {
      this.unlikePost();
    } else {
      this.likePost();
    }
  };

  render() {
    const { post, currentUser, deletePost, refreshPosts } = this.props;
    const { likedByCurrentUser } = this.state;
    return (
      <>
        {this.state.edit ? (
          <PostForm
            refreshPosts={refreshPosts}
            postToEdit={post}
            toggleEdit={this.toggleEdit}
          />
        ) : (
          <article>
            {this.currentUserIsAuthor() && (
              <div className="controls">
                <ul>
                  {this.props.errorMessages.map((msg, index) => (
                    <li key={`error${index}`} style={{ color: "red" }}>
                      {msg}
                    </li>
                  ))}
                </ul>
                <button onClick={this.toggleEdit}>Edit Post</button>
                <button onClick={() => deletePost(post.id)}>Delete Post</button>
              </div>
            )}
            <p>
              <strong>Written by => {post.author.name}</strong>
            </p>
            <p>POST BODY =>{post.body}</p>
            {post.smallImageUrl && (
              <img width="200" src={post.smallImageUrl} alt="post image" />
            )}
            <p>Posted {moment(post.created_at, "YYYY-MM-DD").fromNow()}</p>
            <p>
              {!this.currentUserIsAuthor() && (
                <button onClick={this.toggleLike}>
                  {likedByCurrentUser ? "Unlike" : "Like"}
                </button>
              )}
            </p>
          </article>
        )}
        <p>--------------------------------------</p>
      </>
    );
  }
}

export default Post;
