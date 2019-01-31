import React from "react";
import Users from "../components/Users";
import Nav from "../components/Nav";
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
    this.setState({
      users: fetchedUsers.users
    });
  };

  render() {
    return (
      <>
        <Nav />
        <Users users={this.state.users} style={{ paddingLeft: "20px" }} />
      </>
    );
  }
}

export default UsersPage;
