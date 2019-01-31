import React from "react";
import Users from "../components/Users";
import Nav from "../components/Nav";
import PropTypes from "prop-types";
import { getCurrentUser, getUsers } from "../API/users";

class UsersPage extends React.Component {
  state = {
    users: [],
    currentUser: null
  };

  async componentDidMount() {
    await this.fetchUsers();
  }

  fetchUsers = async () => {
    const fetchedUsers = await getUsers();
    const fetchedCurrentUser = await getCurrentUser("");
    this.setState({
      users: fetchedUsers.users,
      currentUser: fetchedCurrentUser.user
    });
  };

  render() {
    const { users, currentUser } = this.state;
    return (
      users &&
      currentUser && (
        <>
          <Nav currentUser={this.state.currentUser} />
          <Users users={this.state.users} style={{ paddingLeft: "20px" }} />
        </>
      )
    );
  }
}

export default UsersPage;
