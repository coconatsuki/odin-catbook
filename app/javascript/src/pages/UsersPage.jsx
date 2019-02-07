import React from "react";
import Users from "../components/Users";
import Nav from "../components/Nav";
import PropTypes from "prop-types";
import { getCurrentUser, getUsers } from "../API/users";
import { Body } from "../styles/global";

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
      <>
        <Body />
        {users && currentUser && (
          <div>
            <Nav currentUser={this.state.currentUser} activePage="usersPage" />
            <Users users={this.state.users} />
          </div>
        )}
      </>
    );
  }
}

export default UsersPage;
