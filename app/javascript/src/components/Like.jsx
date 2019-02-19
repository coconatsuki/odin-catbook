import React from "react";
import PropTypes from "prop-types";
import { addLike, destroyLike } from "../API/likes";
import poo from "../images/poo.png";
import smallHeart from "../images/small-heart.png";
import {
  Img,
  Wrapper,
  Controls,
  LikeButton,
  DislikeButton,
  Counters
} from "../styles/like";
import { Border } from "../styles/global";

class Like extends React.Component {
  static propTypes = {
    postId: PropTypes.number.isRequired,
    likesCount: PropTypes.number.isRequired,
    dislikesCount: PropTypes.number.isRequired,
    evaluatedByCurrentUser: PropTypes.number,
    likedByCurrentUser: PropTypes.number,
    dislikedByCurrentUser: PropTypes.number,
    setErrorMessages: PropTypes.func.isRequired,
    currentUserIsAuthor: PropTypes.func.isRequired,
    refreshPosts: PropTypes.func.isRequired
  };

  addEvaluation = async key => {
    const { postId, setErrorMessages } = this.props;

    const fetchedLike = await addLike(postId, key);
    if (fetchedLike.errors) return setErrorMessages(fetchedLike.errors);

    console.log("SUCCESS add", fetchedLike.like);
    this.props.refreshPosts(fetchedLike.like.post, "update");
    setErrorMessages([]);
  };

  removeEvaluation = async () => {
    const { postId, setErrorMessages } = this.props;
    const likeId = this.props.evaluatedByCurrentUser;

    const fetchedLike = await destroyLike(postId, likeId);
    if (fetchedLike.errors) return setErrorMessages(fetchedLike.errors);

    console.log("SUCCESS remove", fetchedLike.like);
    this.props.refreshPosts(fetchedLike.like.post, "update");
    setErrorMessages([]);
  };

  toggleEvaluation = key => {
    console.log("Evaluated ? + key", this.props.evaluatedByCurrentUser, key);
    if (this.props.evaluatedByCurrentUser) {
      this.removeEvaluation();
    } else {
      this.addEvaluation(key);
    }
  };

  render() {
    const {
      evaluatedByCurrentUser,
      likedByCurrentUser,
      dislikedByCurrentUser,
      likesCount,
      dislikesCount
    } = this.props;
    return (
      <Wrapper>
        <Counters>
          <div className="counter">
            <Img src={smallHeart} alt="like-icon" />
            <span>{likesCount}</span>
          </div>
          <div className="counter">
            <Img src={poo} alt="dislike-icon" />
            <span>{dislikesCount}</span>
          </div>
        </Counters>
        {!this.props.currentUserIsAuthor() && <Border />}
        {!this.props.currentUserIsAuthor() && (
          <Controls>
            <LikeButton
              onClick={() => this.toggleEvaluation("likes")}
              display={!dislikedByCurrentUser}
              remove={likedByCurrentUser}
            >
              <i />
              <span>{likedByCurrentUser ? "Remove Like" : "Like"}</span>
            </LikeButton>
            <DislikeButton
              onClick={() => this.toggleEvaluation("dislike")}
              display={!likedByCurrentUser}
              remove={dislikedByCurrentUser}
            >
              <i />
              <span>
                {dislikedByCurrentUser ? "Remove Dislike" : "Dislike"}
              </span>
            </DislikeButton>
          </Controls>
        )}
      </Wrapper>
    );
  }
}

export default Like;
