import React from "react";
import FlipMove from "react-flip-move";
import PropTypes from "prop-types";
import AbstractPostsPage from "./AbstractPostsPage";
import { getPosts } from "../API/posts";
import Posts from "../components/Posts";
import PostForm from "../components/PostForm";
import Nav from "../components/Nav";

class HomePage extends AbstractPostsPage {
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

  render() {
    return (
      <>
        <Nav />
        <div style={{ paddingLeft: "20px" }}>
          <h3>POSTS : </h3>
          <p>--------------------------------------</p>
          <PostForm refreshPosts={this.refreshPosts} />
          <Posts
            posts={this.state.posts}
            currentUser={this.state.currentUser}
            refreshPosts={this.refreshPosts}
            deletePost={this.deletePost}
            errorMessages={this.state.errorMessages}
          />
        </div>
      </>
    );
  }
}

export default HomePage;
