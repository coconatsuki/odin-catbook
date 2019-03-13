import React from "react";
import Users from "../components/Users";
import Nav from "../components/Nav";
import PropTypes from "prop-types";
import { getCurrentUser, getUsers } from "../API/users";
import {
  UsersPageWrapper,
  UsersBlock,
  UsersPageAside
} from "../styles/usersPage";
import { CatImg } from "../styles/global";
import friendsCatLeft from "../images/friends-cat-left.png";
import friendsCatRight from "../images/friends-cat-right.png";

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
        {users && currentUser && (
          <div>
            <UsersPageWrapper>
              <UsersPageAside className="left-aside">
                <CatImg src={friendsCatLeft} />
              </UsersPageAside>
              <UsersBlock>
                <h1>Find new cat-friends</h1>
                <Users users={this.state.users} />
              </UsersBlock>
              <UsersPageAside className="right-aside" right>
                <CatImg src={friendsCatRight} />
              </UsersPageAside>
            </UsersPageWrapper>
          </div>
        )}
      </>
    );
  }
}

export default UsersPage;
