import React from "react";
import Users from "../components/Users";
import Nav from "../components/Nav";
import PropTypes from "prop-types";
import { getCurrentUser, getUsers } from "../API/users";
import { UsersPageWrapper, UsersBlock } from "../styles/usersPage";
import { Body } from "../styles/global";
import { Aside, CatImg } from "../styles/global";
import friendsCat from "../images/friends-cat.png";

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
            <UsersPageWrapper>
              <Aside className="left-aside">
                <CatImg src={friendsCat} />
              </Aside>
              <UsersBlock>
                <h1>Find new cat-friends</h1>
                <Users users={this.state.users} />
              </UsersBlock>
              <Aside className="right-aside" />
            </UsersPageWrapper>
          </div>
        )}
      </>
    );
  }
}

export default UsersPage;
