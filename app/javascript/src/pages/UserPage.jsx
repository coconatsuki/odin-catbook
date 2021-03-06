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
import ErrorsBlock from "../components/ErrorsBlock";
import {
  UserPageWrapper,
  FriendsWrapper,
  Main,
  FormWrapper,
  NoContentMessage,
  ErrorsBlockWrapper
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
    this.setState({
      display: "posts"
    });
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

  canSeeProfile = () => {
    const { user, currentUser } = this.state;
    return currentUser.friends.some(friend => friend.id === user.id);
  };

  isCurrentUser = () => {
    const { user, currentUser } = this.state;
    return currentUser.id === user.id;
  };

  toggleSectionDisplay = (sectionName, e) => {
    e.preventDefault();
    this.setState({
      display: sectionName
    });
  };

  noFriendMessage = () => {
    if (this.isCurrentUser()) {
      return "You've no friends yet.";
    }
    return "This poor cat has no friend yet. Become the first one?";
  };

  noPostMessage = () => {
    if (this.isCurrentUser()) {
      return "You've no post to show yet.";
    }
    return "This cat has no post to show.";
  };

  setErrorMessages = messagesArray => {
    this.setState({
      errorMessages: messagesArray
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
                toggleDisplay={this.toggleSectionDisplay}
                display={display}
                refreshUser={this.refreshUser}
                setErrorMessages={this.setErrorMessages}
              />
              {user.id === currentUser.id && display === "posts" && (
                <FormWrapper>
                  <PostForm refreshPosts={this.refreshPosts} />
                </FormWrapper>
              )}
              {(this.isCurrentUser() || this.canSeeProfile()) &&
                display === "posts" &&
                (this.state.posts.length > 0 ? (
                  <Posts
                    posts={this.state.posts}
                    currentUser={this.state.currentUser}
                    refreshPosts={this.refreshPosts}
                    deletePost={this.deletePost}
                    errorMessages={this.state.errorMessages}
                  />
                ) : (
                  <NoContentMessage>
                    <h2>{this.noPostMessage()}</h2>
                  </NoContentMessage>
                ))}
              {!this.isCurrentUser() &&
                !this.canSeeProfile() &&
                display === "posts" && (
                  <NoContentMessage>
                    <h2>
                      You have to be friend with {user.name} to see this page.
                    </h2>
                  </NoContentMessage>
                )}
              {(this.isCurrentUser() || this.canSeeProfile()) &&
                display === "friends" &&
                (user.friends.length > 0 ? (
                  <FriendsWrapper>
                    <Users users={user.friends} />
                  </FriendsWrapper>
                ) : (
                  <NoContentMessage>
                    <h2>{this.noFriendMessage()}</h2>
                  </NoContentMessage>
                ))}

              {(this.isCurrentUser() || this.canSeeProfile()) &&
                display === "about" && (
                  <AboutMe
                    user={user}
                    isCurrentUser={this.isCurrentUser}
                    refreshProfile={this.refreshUser}
                  />
                )}
            </Main>
            <Aside className="left-aside">
              {this.state.errorMessages.length > 0 && (
                <ErrorsBlockWrapper>
                  <h3>Error while uploading a picture:</h3>
                  <ErrorsBlock errorMessages={this.state.errorMessages} />
                </ErrorsBlockWrapper>
              )}
            </Aside>
          </UserPageWrapper>
        </>
      )
    );
  }
}

export default UserPage;
