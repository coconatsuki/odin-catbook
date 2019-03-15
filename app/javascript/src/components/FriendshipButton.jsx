import React from "react";
import PropTypes from "prop-types";
import ErrorsBlock from "./ErrorsBlock";
import { basicUserType } from "../API/users";
import {
  createFriendRequest,
  updateFriendRequest,
  destroyFriendship
} from "../API/friendships";
import { LightGreyButton } from "../styles/button";

class FriendshipButton extends React.Component {
  static propTypes = {
    user: basicUserType.isRequired,
    refreshUser: PropTypes.func.isRequired,
    deleteFriendRequest: PropTypes.bool
  };

  state = {
    buttonText: null,
    buttonDisabled: false
  };

  sendFriendRequest = async () => {
    const { user, refreshUser } = this.props;
    const response = await createFriendRequest(this.props.user);
    if (response.errors) return;
    this.setState({
      buttonDisabled: true
    });
    refreshUser(user.id);
  };

  acceptFriendRequest = async () => {
    const { user, refreshUser } = this.props;
    const response = await updateFriendRequest(user.sent_friend_request);

    refreshUser(user.id);
  };

  destroyFriendRequest = async () => {
    const { user, refreshUser } = this.props;
    const response = await destroyFriendship(user.sent_friend_request);
    if (response.errors) return;
    this.setState({
      errorMessages: []
    });
    refreshUser(user.id);
  };

  unFriend = async () => {
    const { user, refreshUser } = this.props;
    const response = await destroyFriendship(user.is_friend);
    if (response.errors) return;
    this.setState({
      errorMessages: []
    });
    refreshUser(user.id);
  };

  toggleFriendship = () => {
    const { user, deleteFriendRequest } = this.props;
    if (user.received_friend_request) {
      return;
    }
    if (user.is_friend) {
      return this.unFriend();
    }
    if (deleteFriendRequest) {
      return this.destroyFriendRequest();
    }
    if (user.sent_friend_request) {
      return this.acceptFriendRequest();
    }
    return this.sendFriendRequest();
  };

  friendRequestButtonText = () => {
    const { user, deleteFriendRequest } = this.props;
    if (user.is_friend) {
      return `Unfriend`;
    }
    if (deleteFriendRequest) {
      return `Refuse friend request`;
    }
    if (user.sent_friend_request) {
      return `Accept friend request`;
    }
    if (user.sent_friend_request) {
      return `Accept friend request`;
    }
    if (user.received_friend_request) {
      return "Friend request sent";
    }
    return `Send friend request`;
  };

  render() {
    const { user } = this.props;
    return (
      <>
        <LightGreyButton
          disabled={user.received_friend_request || this.state.buttonDisabled}
          onClick={this.toggleFriendship}
        >
          {this.state.buttonText || this.friendRequestButtonText()}
        </LightGreyButton>
      </>
    );
  }
}

export default FriendshipButton;
