import React from "react";
import PropTypes from "prop-types";
import { addLike, destroyLike } from "../API/likes";

class Like extends React.Component {
  static propTypes = {
    postId: PropTypes.number.isRequired,
    likesCount: PropTypes.number.isRequired,
    likedByCurrentUser: PropTypes.number,
    setErrorMessages: PropTypes.func.isRequired,
    currentUserIsAuthor: PropTypes.func.isRequired
  };

  state = {
    likesCount: this.props.likesCount,
    likedByCurrentUser: this.props.likedByCurrentUser
  };

  likePost = async () => {
    const { postId, setErrorMessages } = this.props;
    const fetchedLike = await addLike(postId);
    if (fetchedLike.errors) return setErrorMessages(fetchedLike.errors);
    this.setState({
      likesCount: this.state.likesCount + 1,
      likedByCurrentUser: fetchedLike.like.id
    });
    setErrorMessages([]);
  };

  unlikePost = async () => {
    const { postId, setErrorMessages } = this.props;
    const likeId = this.state.likedByCurrentUser;
    const fetchedLike = await destroyLike(postId, likeId);
    if (fetchedLike.errors) return setErrorMessages(fetchedLike.errors);
    this.setState({
      likesCount: this.state.likesCount - 1,
      likedByCurrentUser: null
    });
    setErrorMessages([]);
  };

  toggleLike = () => {
    if (this.state.likedByCurrentUser) {
      this.unlikePost();
    } else {
      this.likePost();
    }
  };

  render() {
    const { likedByCurrentUser, likesCount } = this.state;
    return (
      <>
        <p>
          {likesCount} {likesCount > 1 ? "likes" : "like"}
        </p>
        {!this.props.currentUserIsAuthor() && (
          <button onClick={this.toggleLike}>
            {likedByCurrentUser ? "Unlike" : "Like"}
          </button>
        )}
      </>
    );
  }
}

export default Like;
