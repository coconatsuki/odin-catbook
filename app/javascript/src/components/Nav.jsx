import React from "react";
import PropTypes from "prop-types";
import { currentUserType } from "../API/users";
import { Navigation, List, ListElement, Logo } from "../styles/nav";

class Nav extends React.Component {
  static propTypes = {
    currentUser: currentUserType,
    homePage: PropTypes.bool,
    usersPage: PropTypes.bool,
    userPage: PropTypes.bool,
    requestsPage: PropTypes.bool
  };

  render() {
    const { currentUser } = this.props;
    return currentUser ? (
      <Navigation>
        <Logo href="#">
          <i />
        </Logo>
        <List>
          <ListElement key="current-user-page" active={this.props.userPage}>
            <a href={`/users/${currentUser.id}`}>{currentUser.name}</a>
          </ListElement>
          <ListElement key="home-page" active={this.props.homePage}>
            <a href="/posts">Home</a>
          </ListElement>
          <ListElement key="users-page" active={this.props.usersPage}>
            <a href="/users">Find cat-friends</a>
          </ListElement>
          <ListElement
            key="friend-requests-page"
            active={this.props.requestsPage}
          >
            <a href={`/users/${currentUser.id}/received_requests`}>
              <strong>{currentUser.requests_count}</strong> friend requests
            </a>
          </ListElement>
          <ListElement key="log-in-and-out">
            <a href="/auth/logout">Log out</a>
          </ListElement>
        </List>
      </Navigation>
    ) : (
      <p>LOG OUT</p>
    );
  }
}

export default Nav;

{
  /* <header class="navbar">
  <div class="container">
    <nav>
      <ul class="nav navbar-nav navbar-right">
        <% if user_signed_in? %>
          <li><%= link_to current_user.name, current_user %></li>
          <li><%= link_to "Home", root_path %></li>
          <li><%= link_to "Find cat-friends", users_path %></li>
          <li>
            <%= link_to received_requests_user_path(current_user) do %>
              <strong id="receivedrequests">
                <%= current_user.received_pending_friends.count %>
              </strong> friend requests
            <% end %>
          </li>
          <li><%= link_to "Log out", destroy_user_session_path, method: :delete %><li>
        <% else %>
          <li><%= link_to "Log in", new_user_session_path %></li>
          <li><%= link_to "Sign up", new_user_registration_path %></li>
        <% end %>
      </ul>
    </nav>
  </div>
</header> */
}
