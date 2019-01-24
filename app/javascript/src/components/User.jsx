import React from "react";
import PropTypes from "prop-types";

class User extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      friends: PropTypes.array.isRequired
    }).isRequired,
    currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }),
    canSeeProfile: PropTypes.func.isRequired,
    toggleDisplayFriends: PropTypes.func.isRequired
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
            <p>
              <a onClick={this.props.toggleDisplayFriends}>
                {user.friends.length}
                {user.friends.length > 1 ? "FRIENDS" : "FRIEND"}
              </a>
            </p>
          </div>
        ) : (
          <p>
            <strong>
              If you're not friend with this cat, you can't see its page.
            </strong>
          </p>
        )}
      </>
    );
  }
}

export default User;
