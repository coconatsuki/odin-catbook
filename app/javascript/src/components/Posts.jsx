import React from "react";
import FlipMove from "react-flip-move";
import PropTypes from "prop-types";
import { postType } from "../API/posts";
import { currentUserType } from "../API/users";
import Post from "./Post";
import { PostsWrapper } from "../styles/home";

class Posts extends React.Component {
  static propTypes = {
    posts: PropTypes.arrayOf(postType).isRequired,
    currentUser: currentUserType,
    refreshPosts: PropTypes.func.isRequired,
    fetchStats: PropTypes.func,
    deletePost: PropTypes.func.isRequired,
    errorMessages: PropTypes.array.isRequired
  };

  render() {
    const { postAuthor, posts } = this.props;
    return (
      <PostsWrapper>
        <FlipMove>
          {posts.map(post => (
            <Post
              key={post.id}
              post={post}
              currentUser={this.props.currentUser}
              refreshPosts={this.props.refreshPosts}
              deletePost={this.props.deletePost}
              errorMessages={this.props.errorMessages}
              fetchStats={this.props.fetchStats}
            />
          ))}
        </FlipMove>
      </PostsWrapper>
    );
  }
}

export default Posts;
