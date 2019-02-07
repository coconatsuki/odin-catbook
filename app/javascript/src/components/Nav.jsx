import React from "react";
import PropTypes from "prop-types";
import { currentUserType } from "../API/users";
import { Navigation, List, ListElement, Logo, Highlight } from "../styles/nav";

class Nav extends React.Component {
  static propTypes = {
    currentUser: currentUserType,
    activePage: PropTypes.string.isRequired
  };

  state = {
    listCoordinates: { width: 0, height: 0, left: 0, top: 0 },
    displayHighlight: false
  };

  constructor(props) {
    super(props);
    this.homePageDiv = React.createRef();
    this.usersPageDiv = React.createRef();
    this.userPageDiv = React.createRef();
    this.requestsPageDiv = React.createRef();
  }

  componentDidMount = () => {
    this.highlightActiveList();
  };

  highlightActiveList = () => {
    const activeList = this[`${this.props.activePage}Div`];
    if (!activeList) return;
    this.highlightList(activeList.current);
  };

  highlightList = listToHighlight => {
    console.log("DIV", listToHighlight);
    const linkCoords = listToHighlight.getBoundingClientRect();
    const listCoordinates = {
      width: linkCoords.width,
      height: linkCoords.height,
      top: linkCoords.top + window.scrollY,
      left: linkCoords.left + window.scrollX
    };
    this.setState({
      listCoordinates,
      displayHighlight: true
    });
  };

  followDiv = e => {
    this.highlightList(e.currentTarget);
  };

  render() {
    const { currentUser, activePage } = this.props;
    return currentUser ? (
      <Navigation>
        <Logo href="#">
          <i />
        </Logo>
        <List>
          <ListElement
            key="current-user-page"
            active={activePage === "userPage"}
            onMouseEnter={this.followDiv}
            onMouseLeave={this.highlightActiveList}
            ref={this.userPageDiv}
          >
            <a href={`/users/${currentUser.id}`}>{currentUser.name}</a>
          </ListElement>
          <ListElement
            key="home-page"
            active={activePage === "homePage"}
            onMouseEnter={this.followDiv}
            onMouseLeave={this.highlightActiveList}
            ref={this.homePageDiv}
          >
            <a href="/posts">Home</a>
          </ListElement>
          <ListElement
            key="users-page"
            active={activePage === "usersPage"}
            onMouseEnter={this.followDiv}
            onMouseLeave={this.highlightActiveList}
            ref={this.usersPageDiv}
          >
            <a href="/users">Find cat-friends</a>
          </ListElement>
          <ListElement
            key="friend-requests-page"
            active={activePage === "requestsPage"}
            onMouseEnter={this.followDiv}
            onMouseLeave={this.highlightActiveList}
            ref={this.requestsPageDiv}
          >
            <a href={`/users/${currentUser.id}/received_requests`}>
              <strong>{currentUser.requests_count}</strong> friend requests
            </a>
          </ListElement>
          <ListElement
            key="log-in-and-out"
            onMouseEnter={this.followDiv}
            onMouseLeave={this.highlightActiveList}
          >
            <a href="/auth/logout">Log out</a>
          </ListElement>
        </List>
        <Highlight
          listCoordinates={this.state.listCoordinates}
          displayHighlight={this.state.displayHighlight}
        />
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
