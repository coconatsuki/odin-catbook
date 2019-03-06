import React from "react";
import PropTypes from "prop-types";
import { basicUserType } from "../API/users";
import defaultCat from "../images/default-cat.png";
import { UsersWrapper, UsersList, UserItem } from "../styles/usersPage";

class Users extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(basicUserType).isRequired
  };

  render() {
    return (
      <UsersWrapper>
        <UsersList className="usersList">
          {this.props.users.map(user => (
            <UserItem key={user.id}>
              <a href={`/users/${user.id}`}>
                <img src={user.cropped_profile_pic || defaultCat} />
                <span className="name">{user.name}</span>
                {user.sent_friend_request && (
                  <span className="request">
                    <em> Friend request received</em>
                  </span>
                )}
                {user.received_friend_request && (
                  <span className="request">
                    <em>Friend request sent</em>
                  </span>
                )}
              </a>
            </UserItem>
          ))}
        </UsersList>
      </UsersWrapper>
    );
  }
}

export default Users;
