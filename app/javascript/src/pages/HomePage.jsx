import React from "react";
import PropTypes from "prop-types";
import AbstractPage from "./AbstractPage";
import { getPosts } from "../API/posts";
import { getCurrentUser } from "../API/users";
import Posts from "../components/Posts";
import PostForm from "../components/PostForm";
import Stats from "../components/Stats";
import Nav from "../components/Nav";
import { Body } from "../styles/global";
import { HomeWrapper, Aside, Main, FormWrapper, CatImg } from "../styles/home";
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

  fetchStats = async () => {
    const fetchedStats = await getStats();
    this.setState({
      stats: fetchedStats
    });
  };

  currentUserPosts = () =>
    this.state.posts.filter(
      post => post.author.id === this.state.currentUser.id
    );

  friendsPosts = () =>
    this.state.posts.filter(
      post => post.author.id !== this.state.currentUser.id
    );

  render() {
    const { currentUser } = this.state;
    return (
      currentUser && (
        <>
          <Body />
          <Nav currentUser={currentUser} activePage="homePage" />
          <HomeWrapper>
            <Aside className="left-aside">
              <CatImg src={postsCat} />
            </Aside>
            <Main>
              <FormWrapper>
                <PostForm refreshPosts={this.refreshPosts} />
              </FormWrapper>
              <Posts
                posts={this.state.posts}
                currentUser={currentUser}
                refreshPosts={this.refreshPosts}
                deletePost={this.deletePost}
                errorMessages={this.state.errorMessages}
              />
            </Main>
            <Aside>
              <Stats
                currentUserPosts={this.currentUserPosts()}
                currentUser={currentUser}
              />
            </Aside>
          </HomeWrapper>
        </>
      )
    );
  }
}

export default HomePage;
