import React from "react";
import PropTypes from "prop-types";

class Nav extends React.Component {
  static propTypes = {};

  render() {
    return (
      <nav style={{ position: "absolute", top: "20px", right: "20px" }}>
        <p>NAV</p>
      </nav>
    );
  }
}

export default Nav;
