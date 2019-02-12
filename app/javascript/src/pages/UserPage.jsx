import React from "react";
import AbstractPage from "./AbstractPage";
import User from "../components/User";
import Users from "../components/Users";
import Posts from "../components/Posts";
import PostForm from "../components/PostForm";
import AboutMe from "../components/AboutMe";
import Nav from "../components/Nav";
import { getUserById, getCurrentUser } from "../API/users";
import { Body, Wrapper } from "../styles/global";

class UserPage extends AbstractPage {
  state = {
    user: null,
    currentUser: null,
    errorMessages: [],
    posts: [],
    display: "posts"
  };

  componentDidMount = async () => {
    const userId = this.getUserIdFromHtml();
    await this.fetchUserAndPosts(userId);
    await this.fetchCurrentUser("?withFriends=yes");
  };

  fetchUserAndPosts = async userId => {
    const fetchedUser = await getUserById(userId);
    this.setState({
      user: fetchedUser.user,
      posts: fetchedUser.user.posts
    });
  };

  getUserIdFromHtml = () => {
    const div = document.getElementById("user-container");
    return parseInt(div.dataset.id);
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

  updateUser = async userId => {
    await this.fetchUserAndPosts(userId);
    await this.fetchCurrentUser("?withFriends=yes");
  };

  render() {
    const { user, currentUser, display } = this.state;
    return (
      user &&
      currentUser && (
        <>
          <Body />
          <Nav currentUser={currentUser} activePage="userPage" />
          <Wrapper>
            <User
              user={this.state.user}
              currentUser={this.state.currentUser}
              canSeeProfile={this.canSeeProfile}
              isCurrentUser={this.isCurrentUser}
              toggleDisplay={this.toggleDisplay}
              display={display}
              updateUser={this.updateUser}
            />
            {user.id === currentUser.id && display === "posts" && (
              <PostForm refreshPosts={this.refreshPosts} />
            )}

            {this.canSeeProfile() && display === "posts" && (
              <Posts
                posts={this.state.posts}
                currentUser={this.state.currentUser}
                refreshPosts={this.refreshPosts}
                deletePost={this.deletePost}
                errorMessages={this.state.errorMessages}
              />
            )}
            {this.canSeeProfile && display === "friends" && (
              <Wrapper>
                <Users users={user.friends} />
              </Wrapper>
            )}
            {this.canSeeProfile && display === "about" && (
              <AboutMe
                user={user}
                isCurrentUser={this.isCurrentUser}
                refreshProfile={this.updateUser}
              />
            )}
          </Wrapper>
        </>
      )
    );
  }
}

export default UserPage;
