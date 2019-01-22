import React from "react";
import PropTypes from "prop-types";
import { getCurrentUser, getUsers } from "../API/users";

class Users extends React.Component {
  state = {
    users: [],
    currentUser: null
  };

  async componentDidMount() {
    await this.fetchUsers();
    await this.fetchCurrentUser();
  }

  fetchUsers = async () => {
    const fetchedUsers = await getUsers();
    console.log("FETCHED USERS", fetchedUsers);
    this.setState({
      posts: fetchedUsers.users
    });
  };

  fetchCurrentUser = async () => {
    const fetchedUser = await getCurrentUser();
    this.setState({
      currentUser: fetchedUser ? fetchedUser.current_user : null
    });
  };

  render() {
    return (
      <ul className="usersList">
        {this.state.users
          .filter(user => user.id !== this.state.currentUser.id)
          .map(user => (
            <li key={user.id}>
              <a href={`/users/${user.id}`}>{user.name}</a>
            </li>
          ))}
      </ul>
    );
  }
}

export default Users;
