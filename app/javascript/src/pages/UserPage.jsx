import React from "react";
import AbstractPostsPage from "./AbstractPostsPage";
import User from "../components/User";
import Posts from "../components/Posts";
import PostForm from "../components/PostForm";
import { getUserById, getCurrentUser } from "../API/users";

class UserPage extends AbstractPostsPage {
  state = {
    user: null,
    currentUser: null,
    errorMessages: [],
    posts: []
  };

  componentDidMount = async () => {
    const userId = this.getUserIdFromHtml();
    await this.fetchUserAndPosts(userId);
    await this.fetchCurrentUser("withFriends");
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
    return currentUser.friends.includes(user) || currentUser.id === user.id;
  };

  render() {
    const { user, currentUser } = this.state;
    return (
      this.state.user &&
      this.state.currentUser && (
        <>
          <User
            user={this.state.user}
            currentUser={this.state.currentUser}
            canSeeProfile={this.canSeeProfile}
          />
          {user.id === currentUser.id && (
            <PostForm refreshPosts={this.refreshPosts} />
          )}

          {this.canSeeProfile() && (
            <Posts
              posts={this.state.posts}
              currentUser={this.state.currentUser}
              refreshPosts={this.refreshPosts}
              deletePost={this.deletePost}
              errorMessages={this.state.errorMessages}
            />
          )}
        </>
      )
    );
  }
}

export default UserPage;
