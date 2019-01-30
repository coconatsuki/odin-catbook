import React from "react";
import PropTypes from "prop-types";
import { userType } from "../API/users";

class Users extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(userType).isRequired
  };

  render() {
    return (
      <ul className="usersList">
        {this.props.users.map(user => (
          <li key={user.id}>
            <a href={`/users/${user.id}`}>{user.name}</a>
          </li>
        ))}
      </ul>
    );
  }
}

export default Users;
