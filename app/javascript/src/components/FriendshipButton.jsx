import React from "react";
import PropTypes from "prop-types";
import ErrorsBlock from "./ErrorsBlock";
import { userType } from "../API/users";
import {
  sendFriendRequest,
  acceptFriendRequest,
  destroyFriendship
} from "../API/friendships";

class FriendshipButton extends React.Component {
  static propTypes = {
    user: userType.isRequired
  };

  state = {
    errorMessages: []
  };

  sendFriendRequest = async () => {
    // const { postId, setErrorMessages } = this.props;
    // const fetchedLike = await addLike(postId);
    // if (fetchedLike.errors) return setErrorMessages(fetchedLike.errors);
    // this.setState({
    //   likesCount: this.state.likesCount + 1,
    //   likedByCurrentUser: fetchedLike.like.id
    // });
    // setErrorMessages([]);
  };

  acceptFriendRequest = async () => {
    // const { postId, setErrorMessages } = this.props;
    // const fetchedLike = await addLike(postId);
    // if (fetchedLike.errors) return setErrorMessages(fetchedLike.errors);
    // this.setState({
    //   likesCount: this.state.likesCount + 1,
    //   likedByCurrentUser: fetchedLike.like.id
    // });
    // setErrorMessages([]);
  };

  destroyFriendRequest = async () => {
    // const { postId, setErrorMessages } = this.props;
    // const likeId = this.state.likedByCurrentUser;
    // const fetchedLike = await destroyLike(postId, likeId);
    // if (fetchedLike.errors) return setErrorMessages(fetchedLike.errors);
    // this.setState({
    //   likesCount: this.state.likesCount - 1,
    //   likedByCurrentUser: null
    // });
    // setErrorMessages([]);
  };

  toggleFriendship = () => {
    const { user } = this.props;
    if (user.friend_request_sent) {
      return;
    }
    if (user.friend_request_received) {
      return `Accept ${user.name} friend request`;
    }
    if (user.friend_request_received) {
      return `Accept ${user.name} friend request`;
    }
    if (user.friend_) {
      return `Unfriend ${user.name}`;
    }
    return `Send friend request to ${user.name}`;
  };

  friendRequestButtonText = () => {
    const { user } = this.props;
    if (user.friend_request_sent) {
      return `Friend request already sent`;
    }
    if (user.friend_request_received) {
      return `Accept ${user.name} friend request`;
    }
    if (user.friend_request_received) {
      return `Accept ${user.name} friend request`;
    }
    if (user.friend_) {
      return `Unfriend ${user.name}`;
    }
    return `Send friend request to ${user.name}`;
  };

  render() {
    const { user } = this.props;
    return (
      <>
        <ErrorsBlock errorMessages={this.state.errorMessages} />
        <button disabled={user.friend_request_sent}>
          {this.friendRequestButtonText()}
        </button>
      </>
    );
  }
}

export default FriendshipButton;
