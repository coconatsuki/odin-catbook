import React from "react";
import { destroyPost } from "../API/posts";
import { getCurrentUser } from "../API/users";

class AbstractHomePage extends React.Component {
  refreshPosts = (postToChange, method) => {
    console.log("REFRESH POST", postToChange, method);
    const { posts } = this.state;
    switch (method) {
      case "update":
        const updatedPosts = posts.map(post =>
          post.id === postToChange.id ? postToChange : post
        );
        this.setState({
          posts: updatedPosts
        });
        break;

      case "create":
        this.setState({
          posts: [postToChange, ...posts]
        });
        break;

      case "delete":
        const filteredPosts = posts.filter(post => post.id !== postToChange.id);
        this.setState({
          posts: filteredPosts
        });
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

  clearErrors = () => {
    this.setState({
      errorMessages: []
    });
  };

  updateErrorMessages = message => {
    this.setState({
      errorMessages: [...message]
    });
  };

  fetchCurrentUser = async () => {
    const fetchedUser = await getCurrentUser();
    this.setState({
      currentUser: fetchedUser ? fetchedUser.current_user : null
    });
  };
}

export default AbstractHomePage;
