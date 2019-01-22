import React from "react";
import PropTypes from "prop-types";

class Users extends React.Component {
  static propTypes = {
    users: PropTypes.PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired
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
