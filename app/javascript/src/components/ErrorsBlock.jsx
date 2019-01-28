import React from "react";
import PropTypes from "prop-types";

class ErrorsBlock extends React.Component {
  static propTypes = {
    errorMessages: PropTypes.array.isRequired
  };

  render() {
    return (
      <ul>
        {this.props.errorMessages.map((msg, index) => (
          <li key={`error${index}`} style={{ color: "red" }}>
            {msg}
          </li>
        ))}
      </ul>
    );
  }
}

export default ErrorsBlock;
