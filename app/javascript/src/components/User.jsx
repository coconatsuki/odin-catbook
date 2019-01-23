import React from "react";
import PropTypes from "prop-types";

class User extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }),
    canSeeProfile: PropTypes.func.isRequired
  };

  render() {
    const { user, currentUser } = this.props;
    return (
      <>
        <p>Link to Edit profile here</p>
        <p>PROFILE PIC HERE</p>
        <p>{user.name}</p>
        {this.props.canSeeProfile() ? (
          <div className="current-user">
            <p>RENDER Friends Requests here</p>
            <p>RENDER How many friends, posts, likes...</p>
            <p>FRIENDS LISTS</p>
          </div>
        ) : (
          <p>If you're not friend with this cat, you can't see its page.</p>
        )}
      </>
    );
  }
}

export default User;
