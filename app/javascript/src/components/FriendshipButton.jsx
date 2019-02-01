import React from "react";
import PropTypes from "prop-types";
import ErrorsBlock from "./ErrorsBlock";
import { basicUserType } from "../API/users";
import {
  createFriendRequest,
  updateFriendRequest,
  destroyFriendship
} from "../API/friendships";

class FriendshipButton extends React.Component {
  static propTypes = {
    user: basicUserType.isRequired,
    updateUser: PropTypes.func.isRequired,
    deleteFriendRequest: PropTypes.bool
  };

  state = {
    errorMessages: [],
    buttonText: null,
    buttonDisabled: false
  };

  setErrorMessages = messagesArray => {
    this.setState({
      errorMessages: messagesArray
    });
  };

  sendFriendRequest = async () => {
    const { user, updateUser } = this.props;
    console.log("sending friend request !");
    const response = await createFriendRequest(this.props.user);
    if (response.errors) return this.setErrorMessages(response.errors);
    this.setState({
      errorMessages: [],
      buttonDisabled: true
    });
    updateUser(user.id);
  };

  acceptFriendRequest = async () => {
    const { user, updateUser } = this.props;
    console.log("accepting friend request !", user.sent_friend_request);
    const response = await updateFriendRequest(user.sent_friend_request);
    if (response.errors) return this.setErrorMessages(response.errors);
    this.setState({
      errorMessages: []
    });
    updateUser(user.id);
  };

  destroyFriendRequest = async () => {
    const { user, updateUser } = this.props;
    console.log("destroying friend request !", user.sent_friend_request);
    const response = await destroyFriendship(user.sent_friend_request);
    if (response.errors) return this.setErrorMessages(response.errors);
    this.setState({
      errorMessages: []
    });
    updateUser(user.id);
  };

  unFriend = async () => {
    const { user, updateUser } = this.props;
    console.log("unfriending !", user.is_friend);
    const response = await destroyFriendship(user.is_friend);
    if (response.errors) return this.setErrorMessages(response.errors);
    this.setState({
      errorMessages: []
    });
    updateUser(user.id);
  };

  toggleFriendship = () => {
    const { user, deleteFriendRequest } = this.props;
    if (user.received_friend_request) {
      return;
    }
    if (deleteFriendRequest) {
      return this.destroyFriendRequest();
    }
    if (user.sent_friend_request) {
      return this.acceptFriendRequest();
    }
    if (user.is_friend) {
      return this.unFriend();
    }
    return this.sendFriendRequest();
  };

  friendRequestButtonText = () => {
    const { user, deleteFriendRequest } = this.props;
    if (deleteFriendRequest) {
      return `Refuse ${user.name} friend request`;
    }
    if (user.sent_friend_request) {
      return `Accept ${user.name} friend request`;
    }
    if (user.sent_friend_request) {
      return `Accept ${user.name} friend request`;
    }
    if (user.received_friend_request) {
      return "Friend request sent";
    }
    if (user.is_friend) {
      return `Unfriend ${user.name}`;
    }
    return `Send friend request to ${user.name}`;
  };

  render() {
    const { user } = this.props;
    return (
      <>
        <ErrorsBlock errorMessages={this.state.errorMessages} />
        <button
          disabled={user.received_friend_request || this.state.buttonDisabled}
          onClick={this.toggleFriendship}
        >
          {this.state.buttonText || this.friendRequestButtonText()}
        </button>
      </>
    );
  }
}

export default FriendshipButton;
