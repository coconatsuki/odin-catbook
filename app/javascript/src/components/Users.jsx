import React from "react";
import PropTypes from "prop-types";
import { basicUserType } from "../API/users";

class Users extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(basicUserType).isRequired
  };

  render() {
    return (
      <ul className="usersList">
        {this.props.users.map(user => (
          <li key={user.id}>
            <a href={`/users/${user.id}`}>{user.name}</a>
            {user.sent_friend_request && (
              <span> This cat sent you a friend request.</span>
            )}
            {user.received_friend_request && (
              <span> You sent a friend request to that cat.</span>
            )}
          </li>
        ))}
      </ul>
    );
  }
}

export default Users;
