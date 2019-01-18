import React from "react";
import FlipMove from "react-flip-move";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import Post from "./Post";
import { getPosts, destroyPost } from "../API/posts";
import { getCurrentUser } from "../API/users";

class Posts extends React.Component {
  state = {
    posts: [],
    currentUser: null,
    errorMessages: []
  };

  async componentDidMount() {
    await this.fetchPosts();
    await this.fetchCurrentUser();
  }

  fetchPosts = async () => {
    const fetchedPosts = await getPosts();
    console.log("FETCHED POSTS", fetchedPosts);
    this.setState({
      posts: fetchedPosts.posts
    });
  };

  fetchCurrentUser = async () => {
    const fetchedUser = await getCurrentUser();
    this.setState({
      currentUser: fetchedUser ? fetchedUser.current_user : null
    });
  };

  refreshPosts = (freshPost, method) => {
    const { posts } = this.state;
    switch (method) {
      case "update":
        const updatedPosts = posts.map(post =>
          post.id === freshPost.id ? freshPost : post
        );
        this.setState({
          posts: updatedPosts
        });
        break;

      case "create":
        this.setState({
          posts: [freshPost, ...posts]
        });
        break;

      case "delete":
        const filteredPosts = posts.filter(post => post.id !== freshPost.id);
        this.setState({
          posts: filteredPosts
        });
        break;
    }
  };

  clearErrors = () => {
    this.setState({
      errorMessages: []
    });
  };

  updateErrorMessages = message => {
    this.setState({
      errorMessages: [...message]
    });
  };

  deletePost = async postId => {
    this.clearErrors();
    const destroyedPost = await destroyPost(postId);
    if (destroyedPost.errors) {
      updateErrorMessages(destroyedPost.errors);
    } else {
      this.refreshPosts(destroyedPost.post, "delete");
      this.clearErrors();
    }
  };

  render() {
    return (
      <div>
        <h3>POSTS : </h3>
        <p>--------------------------------------</p>
        <p>What's in your mind today?</p>
        <PostForm refreshPosts={this.refreshPosts} />
        <p>--------------------------------------</p>
        <p>NUMBER OF POSTS: {this.state.posts.length}</p>
        <FlipMove>
          {this.state.posts.map(post => (
            <Post
              key={post.id}
              post={post}
              currentUser={this.state.currentUser}
              refreshPosts={this.refreshPosts}
              deletePost={this.deletePost}
              errorMessages={this.state.errorMessages}
            />
          ))}
        </FlipMove>
      </div>
    );
  }
}

export default Posts;
