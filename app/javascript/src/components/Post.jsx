import React from "react";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import Like from "./Like";
import CommentsBlock from "./CommentsBlock";
import ErrorsBlock from "./ErrorsBlock";
import { addLike, destroyLike } from "../API/likes";
import { postType } from "../API/posts";
import { getComments } from "../API/comments";
import { currentUserType } from "../API/users";
import {
  PostArticle,
  Controls,
  PostWrapper,
  PostHeader,
  PostContent
} from "../styles/post";
import { Border } from "../styles/global";
import * as moment from "moment";

class Post extends React.Component {
  static propTypes = {
    post: postType.isRequired,
    currentUser: currentUserType,
    refreshPosts: PropTypes.func.isRequired,
    fetchStats: PropTypes.func,
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
    const { likedByCurrentUser, likesCount, commentsCount } = this.state;
    return (
      <PostWrapper>
        {this.state.edit ? (
          <PostForm
            refreshPosts={refreshPosts}
            postToEdit={post}
            toggleEdit={this.toggleEdit}
          />
        ) : (
          <PostArticle>
            {this.currentUserIsAuthor() && (
              <Controls>
                <ErrorsBlock errorMessages={this.props.errorMessages} />
                <button onClick={this.toggleEdit}>Edit Post</button>
                <button onClick={() => deletePost(post.id)}>Delete Post</button>
              </Controls>
            )}
            <PostHeader>
              <h3>{post.author.name}</h3>
              <span>
                Posted {moment(post.created_at, "YYYY-MM-DD").fromNow()}
              </span>
            </PostHeader>
            <Border />
            <PostContent>{post.body}</PostContent>
            {post.smallImageUrl && (
              <img width="200" src={post.smallImageUrl} alt="post image" />
            )}
            <Like
              postId={post.id}
              likesCount={post.likes_count}
              dislikesCount={post.dislikes_count}
              evaluatedByCurrentUser={post.evaluated_by_currentUser}
              likedByCurrentUser={post.liked_by_currentUser}
              dislikedByCurrentUser={post.disliked_by_currentUser}
              setErrorMessages={this.setErrorMessages}
              currentUserIsAuthor={this.currentUserIsAuthor}
              refreshPosts={this.props.refreshPosts}
              fetchStats={this.props.fetchStats}
            />
            <CommentsBlock
              currentUser={currentUser}
              commentsCount={post.comments_count}
              postId={post.id}
              fetchStats={this.props.fetchStats}
            />
          </PostArticle>
        )}
      </PostWrapper>
    );
  }
}

export default Post;
