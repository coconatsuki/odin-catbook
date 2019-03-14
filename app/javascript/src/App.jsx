import React from "react";
import { Router, Route, Link } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import UserPage from "./pages/UserPage";
import FriendRequests from "./pages/FriendRequests";
import Nav from "./components/Nav";
import { getCurrentUser } from "./API/users";
import { Body } from "./styles/global";

class App extends React.Component {
  state = {
    history: createBrowserHistory(),
    currentUser: null
  };

  componentDidMount = async () => {
    this.refreshUser();
  };

  refreshUser = async () => {
    const currentUser = await getCurrentUser("?withFriendRequests=yes");
    this.setState({
      currentUser: currentUser.user
    });
  };

  render() {
    const { currentUser, history } = this.state;
    return (
      <Router history={history}>
        <>
          <Body />
          {currentUser && (
            <>
              <Nav currentUser={currentUser} history={history} />
              <Route
                path="/"
                exact
                render={routeProps => (
                  <HomePage {...routeProps} currentUser={currentUser} />
                )}
              />
              <Route
                path="/users/"
                exact
                render={routeProps => (
                  <UsersPage {...routeProps} currentUser={currentUser} />
                )}
              />
              <Route
                path="/users/:id"
                render={routeProps => (
                  <UserPage
                    {...routeProps}
                    currentUser={currentUser}
                    userId={Number(routeProps.match.params.id)}
                  />
                )}
              />
              <Route
                path="/received_requests"
                render={routeProps => (
                  <FriendRequests
                    {...routeProps}
                    currentUser={currentUser}
                    refreshUser={this.refreshUser}
                  />
                )}
              />
            </>
          )}
        </>
      </Router>
    );
  }
}

export default App;
