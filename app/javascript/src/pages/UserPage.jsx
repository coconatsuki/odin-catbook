import React from "react";
import User from "../components/User";
import { getUserById } from "../API/users";

class UserPage extends React.Component {
  state = {
    user: null
  };

  componentDidMount = async () => {
    const userId = this.getUserIdFromHtml();
    const user = await this.fetchUser(userId);
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
    return this.state.user && <User user={this.state.user} />;
  }
}

export default UserPage;
