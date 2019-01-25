import React from "react";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import Like from "./Like";
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
    edit: false
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

  render() {
    const { post, currentUser, deletePost, refreshPosts } = this.props;
    const { likedByCurrentUser, likesCount } = this.state;
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
            <Like
              postId={post.id}
              likesCount={post.likes_count}
              likedByCurrentUser={post.liked_by_current_user}
              setErrorMessages={this.setErrorMessages}
              currentUserIsAuthor={this.currentUserIsAuthor}
            />
          </article>
        )}
        <p>--------------------------------------</p>
      </>
    );
  }
}

export default Post;
