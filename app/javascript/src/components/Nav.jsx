import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { currentUserType } from "../API/users";
import { Navigation, List, ListElement, Logo, Highlight } from "../styles/nav";

class Nav extends React.Component {
  static propTypes = {
    currentUser: currentUserType,
    history: PropTypes.any.isRequired
  };

  state = {
    listCoordinates: { width: 0, height: 0, left: 0, top: 0 },
    displayHighlight: false,
    activePage: null
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
    const activeDiv = this.findDivName();
    this.highlightList(activeDiv.current);
  };

  findDivName = () => {
    const pathname = this.props.history.location.pathname;
    switch (pathname) {
      case "/":
        return this.homePageDiv;
        break;

      case "/users":
        return this.usersPageDiv;
        break;

      case "/received_requests":
        return this.requestsPageDiv;
        break;
    }
    console.log("DO I come here ?");
    if (pathname.match(/\/users\/\d*/)[0] === pathname) {
      return this.userPageDiv;
    }
  };

  highlightList = listToHighlight => {
    console.log("LIST", listToHighlight);
    const linkCoords = listToHighlight.getBoundingClientRect();
    const listCoordinates = {
      width: linkCoords.width,
      height: linkCoords.height,
      top: linkCoords.top + window.scrollY,
      left: linkCoords.left + window.scrollX
    };
    console.log("TITLE", listToHighlight.title);
    this.setState({
      listCoordinates,
      displayHighlight: true,
      activePage: listToHighlight.title
    });
  };

  followDiv = e => {
    this.highlightList(e.currentTarget);
  };

  render() {
    const { currentUser } = this.props;
    const { activePage } = this.state;
    return currentUser ? (
      <Navigation>
        <Logo href="#">
          <i />
        </Logo>
        <List>
          <ListElement
            title="userPage"
            key="current-user-page"
            active={activePage === "userPage"}
            onMouseEnter={this.followDiv}
            onMouseLeave={this.highlightActiveList}
            ref={this.userPageDiv}
          >
            <NavLink to={`/users/${currentUser.id}`}>
              {currentUser.name}
            </NavLink>
          </ListElement>
          <ListElement
            title="homePage"
            key="home-page"
            active={activePage === "homePage"}
            onMouseEnter={this.followDiv}
            onMouseLeave={this.highlightActiveList}
            ref={this.homePageDiv}
          >
            <NavLink to="/">Posts</NavLink>
          </ListElement>
          <ListElement
            title="usersPage"
            key="users-page"
            active={activePage === "usersPage"}
            onMouseEnter={this.followDiv}
            onMouseLeave={this.highlightActiveList}
            ref={this.usersPageDiv}
          >
            <NavLink to="/users">Find cat-friends</NavLink>
          </ListElement>
          <ListElement
            title="requestsPage"
            key="friend-requests-page"
            active={activePage === "requestsPage"}
            onMouseEnter={this.followDiv}
            onMouseLeave={this.highlightActiveList}
            ref={this.requestsPageDiv}
          >
            <NavLink to={`/received_requests`}>
              <strong>{currentUser.requests_count}</strong> friend requests
            </NavLink>
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
