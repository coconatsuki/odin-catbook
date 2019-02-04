import React from "react";
import { destroyPost } from "../API/posts";
import { getCurrentUser } from "../API/users";

class AbstractPage extends React.Component {
  refreshNewPost = newPost => {
    this.setState({
      posts: [newPost, ...posts]
    });
  };

  refreshAllPosts = updatedPost => {
    const updatedPosts = posts.map(post =>
      post.id === updatedPost.id ? updatedPost : post
    );
    this.setState({
      posts: updatedPosts
    });
  };

  refreshDeletedPost = deletedPost => {
    const filteredPosts = posts.filter(post => post.id !== deletedPost.id);
    this.setState({
      posts: filteredPosts
    });
  };

  refreshPosts = (postToChange, method) => {
    const { posts } = this.state;
    switch (method) {
      case "create":
        this.refreshNewPost(postToChange);
        break;

      case "update":
        this.refreshAllPosts(postToChange);
        break;

      case "delete":
        this.refreshDeletedPost(postToChange);
        break;
    }
  };

  deletePost = async postId => {
    this.clearErrors();
    const destroyedPost = await destroyPost(postId);
    if (destroyedPost.errors) {
      updateErrorMessages(destroyedPost.errors);
    } else {
      this.refreshPosts(destroyedPost.post, "delete");
      this.clearErrors();
    }
  };

  updateErrorMessages = message => {
    this.setState({
      errorMessages: [...message]
    });
  };

  clearErrors = () => {
    this.updateErrorMessages([]);
  };

  fetchCurrentUser = async params => {
    const fetchedCurrentUser = await getCurrentUser(params ? params : "");
    this.setState({
      currentUser: fetchedCurrentUser ? fetchedCurrentUser.user : null
    });
  };
}

export default AbstractPage;
