import React from "react";
import User from "../components/User";
import { getUserById, getCurrentUser } from "../API/users";

class UserPage extends React.Component {
  state = {
    user: null,
    currentUser: null
  };

  componentDidMount = async () => {
    const userId = this.getUserIdFromHtml();
    const user = await this.fetchUser(userId);
    await this.fetchCurrentUser();
  };

  fetchCurrentUser = async () => {
    const fetchedUser = await getCurrentUser();
    this.setState({
      currentUser: fetchedUser ? fetchedUser.current_user : null
    });
  };

  fetchUser = async userId => {
    const fetchedUser = await getUserById(userId);
    this.setState({
      user: fetchedUser.user
    });
  };

  getUserIdFromHtml = () => {
    const div = document.getElementById("user-container");
    return parseInt(div.dataset.id);
  };

  render() {
    const { user, currentUser } = this.state;
    return (
      this.state.user &&
      this.state.currentUser && (
        <>
          <User user={this.state.user} currentUser={this.state.currentUser} />
          <h3>POSTS : </h3>
          <p>--------------------------------------</p>
          {user.id === currentUser.id && <p>What's in your mind today?</p>}
        </>
      )
    );
  }
}

export default UserPage;
