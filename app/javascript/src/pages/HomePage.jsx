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
import {
  PostsWrapper,
  Aside,
  Main,
  FormWrapper,
  Img,
  Stats
} from "../styles/home";
import postsCat from "../images/posts-cat.png";

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

  currentUserPosts = () =>
    this.state.posts.filter(
      post => post.author.id === this.state.currentUser.id
    );

  render() {
    const { currentUser } = this.state;
    return (
      currentUser && (
        <>
          <Body />
          <Nav currentUser={this.state.currentUser} activePage="homePage" />
          <PostsWrapper>
            <Aside>
              <Img src={postsCat} />
            </Aside>
            <Main>
              <FormWrapper>
                <PostForm refreshPosts={this.refreshPosts} />
              </FormWrapper>
              <Posts
                posts={this.state.posts}
                currentUser={this.state.currentUser}
                refreshPosts={this.refreshPosts}
                deletePost={this.deletePost}
                errorMessages={this.state.errorMessages}
              />
            </Main>
            <Aside>
              <Stats>
                <p>Number of posts: {this.currentUserPosts().length}</p>
              </Stats>
            </Aside>
          </PostsWrapper>
        </>
      )
    );
  }
}

export default HomePage;
