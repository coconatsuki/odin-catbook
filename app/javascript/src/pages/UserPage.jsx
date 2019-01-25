import React from "react";
import AbstractPostsPage from "./AbstractPostsPage";
import User from "../components/User";
import Users from "../components/Users";
import Posts from "../components/Posts";
import PostForm from "../components/PostForm";
import { getUserById, getCurrentUser } from "../API/users";

class UserPage extends AbstractPostsPage {
  state = {
    user: null,
    currentUser: null,
    errorMessages: [],
    posts: [],
    displayFriends: false
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
    const isFriend = currentUser.friends.find(friend => friend.id === user.id);
    return isFriend || currentUser.id === user.id;
  };

  toggleDisplayFriends = () => {
    this.setState({
      displayFriends: !this.state.displayFriends
    });
  };

  render() {
    const { user, currentUser, displayFriends } = this.state;
    return (
      user &&
      currentUser && (
        <>
          {displayFriends ? (
            <div className="users-friends">
              <a onClick={this.toggleDisplayFriends}>
                {`Back to ${user.name} Profile`}
              </a>
              <Users users={user.friends} />
            </div>
          ) : (
            <div className="user">
              <User
                user={this.state.user}
                currentUser={this.state.currentUser}
                canSeeProfile={this.canSeeProfile}
                toggleDisplayFriends={this.toggleDisplayFriends}
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
            </div>
          )}
        </>
      )
    );
  }
}

export default UserPage;
