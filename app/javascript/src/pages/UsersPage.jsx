import React from "react";
import Users from "../components/Users";
import PropTypes from "prop-types";
import { getCurrentUser, getUsers } from "../API/users";

class UsersPage extends React.Component {
  state = {
    users: []
  };

  async componentDidMount() {
    await this.fetchUsers();
  }

  fetchUsers = async () => {
    const fetchedUsers = await getUsers();
    console.log("FETCHED USERS", fetchedUsers);
    this.setState({
      users: fetchedUsers.users
    });
  };

  render() {
    return <Users users={this.state.users} />;
  }
}

export default UsersPage;
