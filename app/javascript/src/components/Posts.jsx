import React from "react";
import FlipMove from "react-flip-move";
import PropTypes from "prop-types";
import Post from "./Post";

class Posts extends React.Component {
  static propTypes = {
    posts: PropTypes.PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
        smallImageUrl: PropTypes.string,
        created_at: PropTypes.string.isRequired,
        author: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired
        })
      })
    ).isRequired,
    currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }),
    refreshPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    errorMessages: PropTypes.array.isRequired
  };

  render() {
    return (
      <FlipMove>
        {this.props.posts.map(post => (
          <Post
            key={post.id}
            post={post}
            currentUser={this.props.currentUser}
            refreshPosts={this.props.refreshPosts}
            deletePost={this.props.deletePost}
            errorMessages={this.props.errorMessages}
          />
        ))}
      </FlipMove>
    );
  }
}

export default Posts;
