import React from "react";
// import PropTypes from "prop-types";
import Posts from "./components/Posts";

class App extends React.Component {
  // static propTypes = {
  //   key: PropTypes.string.isRequired,
  //   key: PropTypes.string
  // }

  render() {
    return (
      <div>
        <Posts />
      </div>
    );
  }
}

export default App;
