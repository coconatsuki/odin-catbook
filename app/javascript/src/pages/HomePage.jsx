import React from "react";
import PropTypes from "prop-types";
import AbstractPage from "./AbstractPage";
import { getPosts } from "../API/posts";
import {
  getCurrentUser,
  getStats,
  currentUserWithRequestsType
} from "../API/users";
import Posts from "../components/Posts";
import PostForm from "../components/PostForm";
import Stats from "../components/Stats";
import Nav from "../components/Nav";
import { HomeWrapper, Main, FormWrapper } from "../styles/home";
import { Aside, CatImg } from "../styles/global";
import postsCat from "../images/posts-cat.png";

const defaultStats = {
  maxPosts: { user_id: null, user_name: "No winner yet", number_of_posts: 0 },
  maxComments: {
    user_id: null,
    user_name: "No winner yet",
    number_of_comments: 0
  },
  maxLikes: { user_id: null, user_name: "No winner yet", likes_received: 0 },
  maxPoo: { user_id: null, user_name: "No winner yet", poo_received: 0 }
};

class HomePage extends AbstractPage {
  static propTypes = {
    currentUser: currentUserWithRequestsType.isRequired
  };

  state = {
    posts: [],
    errorMessages: [],
    maxPosts: defaultStats.maxPosts,
    maxComments: defaultStats.maxComments,
    maxLikes: defaultStats.maxLikes,
    maxPoo: defaultStats.maxPoo,
    loadingStats: false
  };

  async componentDidMount() {
    await this.fetchPosts();
    this.fetchStats();
  }

  fetchPosts = async () => {
    const fetchedPosts = await getPosts();
    this.setState({
      posts: fetchedPosts.posts
    });
  };

  toggleLoadingStats = () => {
    this.setState({
      loadingStats: !this.state.loadingStats
    });
  };

  fetchStats = async () => {
    this.toggleLoadingStats();
    const fetchedStats = await getStats();
    this.setState({
      maxPosts: fetchedStats.max_posts.user_id
        ? fetchedStats.max_posts
        : defaultStats.maxPosts,
      maxComments: fetchedStats.max_comments.user_id
        ? fetchedStats.max_comments
        : defaultStats.maxComments,
      maxLikes: fetchedStats.max_likes.user_id
        ? fetchedStats.max_likes
        : defaultStats.maxLikes,
      maxPoo: fetchedStats.max_poo.user_id
        ? fetchedStats.max_poo
        : defaultStats.maxPoo,
      loadingStats: false
    });
  };

  friendsPosts = () =>
    this.state.posts.filter(
      post => post.author.id !== this.props.currentUser.id
    );

  render() {
    const { currentUser } = this.props;
    const { maxPosts, maxComments, maxLikes, maxPoo } = this.state;

    return (
      currentUser && (
        <>
          <HomeWrapper>
            <Aside className="left-aside">
              <CatImg src={postsCat} />
            </Aside>
            <Main>
              <FormWrapper>
                <PostForm
                  refreshPosts={this.refreshPosts}
                  fetchStats={this.fetchStats}
                />
              </FormWrapper>
              <Posts
                posts={this.state.posts}
                currentUser={currentUser}
                refreshPosts={this.refreshPosts}
                deletePost={this.deletePost}
                errorMessages={this.state.errorMessages}
                fetchStats={this.fetchStats}
              />
            </Main>
            <Aside className="right-aside">
              <Stats
                currentUser={currentUser}
                maxPosts={maxPosts}
                maxComments={maxComments}
                maxLikes={maxLikes}
                maxPoo={maxPoo}
                loadingStats={this.state.loadingStats}
              />
            </Aside>
          </HomeWrapper>
        </>
      )
    );
  }
}

export default HomePage;
