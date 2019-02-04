import React from "react";
import FlipMove from "react-flip-move";
import PropTypes from "prop-types";
import AbstractPage from "./AbstractPage";
import { getPosts } from "../API/posts";
import { getCurrentUser } from "../API/users";
import Posts from "../components/Posts";
import PostForm from "../components/PostForm";
import Nav from "../components/Nav";
import { Body } from "../styles/global";

class HomePage extends AbstractPage {
  state = {
    posts: [],
    currentUser: null,
    errorMessages: []
  };

  async componentDidMount() {
    await this.fetchPosts();
    await this.fetchCurrentUser("");
  }

  fetchPosts = async () => {
    const fetchedPosts = await getPosts();
    console.log("FETCHED POSTS", fetchedPosts);
    this.setState({
      posts: fetchedPosts.posts
    });
  };

  render() {
    const { currentUser } = this.state;
    return (
      currentUser && (
        <>
          <Body />
          <Nav currentUser={this.state.currentUser} homePage />
          <div style={{ paddingLeft: "20px", marginTop: "60px" }}>
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
      )
    );
  }
}

export default HomePage;
