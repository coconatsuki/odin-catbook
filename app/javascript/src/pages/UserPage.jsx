import React from "react";
import AbstractPage from "./AbstractPage";
import PropTypes from "prop-types";
import User from "../components/User";
import Users from "../components/Users";
import Posts from "../components/Posts";
import PostForm from "../components/PostForm";
import AboutMe from "../components/AboutMe";
import Nav from "../components/Nav";
import { getUserById, getCurrentUser } from "../API/users";
import { Wrapper } from "../styles/global";
import {
  UserPageWrapper,
  FriendsWrapper,
  Main,
  FormWrapper
} from "../styles/userPage";
import { Aside, CatImg } from "../styles/global";
import profileCat from "../images/profile-cat.png";

class UserPage extends AbstractPage {
  static propTypes = {
    userId: PropTypes.number.isRequired
  };

  state = {
    user: null,
    currentUser: null,
    errorMessages: [],
    posts: [],
    display: "posts"
  };

  reloadUser = async () => {
    const userId = this.props.userId;
    await this.fetchUserAndPosts(userId);
    await this.fetchCurrentUser("?withFriends=yes");
  };

  componentDidMount = async () => {
    this.reloadUser();
  };

  componentDidUpdate() {
    if (this.state.user.id !== this.props.userId) {
      this.reloadUser();
    }
  }

  fetchUserAndPosts = async userId => {
    const fetchedUser = await getUserById(userId);
    this.setState({
      user: fetchedUser.user,
      posts: fetchedUser.user.posts
    });
  };

  refreshUser = async userId => {
    const fetchedUser = await getUserById(userId);
    this.setState({
      user: fetchedUser.user
    });
  };

  getUserIdFromHtml = () => {
    const id = this.props.match.params.id;
    return parseInt(id);
  };

  canSeeProfile = () => {
    const { user, currentUser } = this.state;
    return currentUser.friends.includes(friend => friend.id === user.id);
  };

  isCurrentUser = () => {
    const { user, currentUser } = this.state;
    return currentUser.id === user.id;
  };

  toggleDisplay = (sectionName, e) => {
    e.preventDefault();
    this.setState({
      display: sectionName
    });
  };

  render() {
    const { user, currentUser, display } = this.state;
    return (
      user &&
      currentUser && (
        <>
          <UserPageWrapper>
            <Aside style={{ marginTop: "2%" }}>
              <CatImg src={profileCat} style={{ width: "150px" }} />
            </Aside>
            <Main>
              <User
                user={this.state.user}
                currentUser={this.state.currentUser}
                canSeeProfile={this.canSeeProfile}
                isCurrentUser={this.isCurrentUser}
                toggleDisplay={this.toggleDisplay}
                display={display}
                refreshUser={this.refreshUser}
              />
              {user.id === currentUser.id && display === "posts" && (
                <FormWrapper>
                  <PostForm refreshPosts={this.refreshPosts} />
                </FormWrapper>
              )}

              {(this.isCurrentUser() || this.canSeeProfile()) &&
                display === "posts" && (
                  <Posts
                    posts={this.state.posts}
                    currentUser={this.state.currentUser}
                    refreshPosts={this.refreshPosts}
                    deletePost={this.deletePost}
                    errorMessages={this.state.errorMessages}
                  />
                )}
              {this.canSeeProfile && display === "friends" && (
                <FriendsWrapper>
                  <Users users={user.friends} />
                </FriendsWrapper>
              )}
              {this.canSeeProfile && display === "about" && (
                <AboutMe
                  user={user}
                  isCurrentUser={this.isCurrentUser}
                  refreshProfile={this.refreshUser}
                />
              )}
            </Main>
            <Aside />
          </UserPageWrapper>
        </>
      )
    );
  }
}

export default UserPage;
