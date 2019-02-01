import React from "react";
import PropTypes from "prop-types";
import { currentUserType } from "../API/users";

class Nav extends React.Component {
  static propTypes = {
    currentUser: currentUserType
  };

  render() {
    const { currentUser } = this.props;
    return currentUser ? (
      <nav style={{ position: "absolute", top: "20px", right: "50px" }}>
        <ul style={{ listStyleType: "none", display: "flex" }}>
          <li key="current-user-page">
            <a
              href={`/users/${currentUser.id}`}
              style={{ textDecoration: "none" }}
            >
              {currentUser.name}
            </a>
          </li>
          <li key="home-page" style={{ marginLeft: "20px" }}>
            <a href="/posts" style={{ textDecoration: "none" }}>
              Home
            </a>
          </li>
          <li key="users-page" style={{ marginLeft: "20px" }}>
            <a href="/users" style={{ textDecoration: "none" }}>
              Find cat-friends
            </a>
          </li>
          <li key="friend-requests-page" style={{ marginLeft: "20px" }}>
            <a
              href={`/users/${currentUser.id}/received_requests`}
              style={{ textDecoration: "none" }}
            >
              <strong>{currentUser.requests_count}</strong> friend requests
            </a>
          </li>
          <li key="log-in-and-out" style={{ marginLeft: "20px" }}>
            <a href="/auth/logout" style={{ textDecoration: "none" }}>
              Log out
            </a>
          </li>
        </ul>
      </nav>
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
