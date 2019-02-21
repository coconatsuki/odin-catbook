import React from "react";
import PropTypes from "prop-types";
import { currentUserType } from "../API/users";
import { getStats } from "../API/users";
import poo from "../images/poo.png";
import smallHeart from "../images/small-heart.png";
import { Border } from "../styles/global";
import { StatsWrapper, Stat, Icons } from "../styles/home";

class Stats extends React.Component {
  static propTypes = {
    currentUser: currentUserType.isRequired,
    currentUserPosts: PropTypes.array.isRequired
  };

  state = {
    maxPosts: { user_id: null, user_name: "No winner yet", number_of_posts: 0 },
    maxComments: {
      user_id: null,
      user_name: "No winner yet",
      number_of_comments: 0
    },
    maxLikes: { user_id: null, user_name: "No winner yet", likes_received: 0 },
    maxPoo: { user_id: null, user_name: "No winner yet", likes_received: 0 }
  };

  componentDidMount = () => {
    this.fetchStats();
  };

  fetchStats = async () => {
    const fetchedStats = await getStats();
    console.log(fetchedStats);
    this.setState({
      maxPosts: fetchedStats.max_posts.user_id
        ? fetchedStats.max_posts
        : this.state.maxPosts,
      maxComments: fetchedStats.max_comments.user_id
        ? fetchedStats.max_comments
        : this.state.maxComments,
      maxLikes: fetchedStats.max_likes.user_id
        ? fetchedStats.max_likes
        : this.state.maxLikes,
      maxPoo: fetchedStats.max_poo.user_id
        ? fetchedStats.max_poo
        : this.state.maxPoo
    });
  };

  winnerIsCurrentUser = id => id === this.props.currentUser.id;

  winnerName = stat => {
    const { currentUser } = this.props;
    const { user_id, user_name } = this.state[stat];
    if (user_id === currentUser.id) {
      return "You";
    }
    return user_name;
  };

  render() {
    const { maxPosts, maxComments, maxLikes, maxPoo } = this.state;
    return (
      <StatsWrapper>
        <h3>Winners</h3>
        <h3 className="subtitle">of the week</h3>
        <Border />
        <Stat>
          <h4>Craziest poster*</h4>
          <p>
            <span>
              <strong>{this.winnerName("maxPosts")}</strong>
            </span>
            <span className="faded">
              ( {maxPosts.number_of_posts}
              {maxPosts.number_of_posts > 1 ? " posts" : " post"} )
            </span>
          </p>
        </Stat>
        <Stat>
          <h4>Craziest commenter*</h4>
          <p>
            <span>
              <strong>{this.winnerName("maxComments")}</strong>
            </span>
            <span className="faded">
              ( {maxComments.number_of_comments}
              {maxComments.number_of_comments > 1 ? " comments" : " comment"} )
            </span>
          </p>
        </Stat>
        <Stat>
          <h4>Most loved*</h4>
          <p>
            <span>
              <strong>{this.winnerName("maxLikes")}</strong>
            </span>
            <span>
              <span className="faded">( {maxLikes.likes_received} </span>
              <Icons src={smallHeart} alt="like-icon" />
              <span className="faded">)</span>
            </span>
          </p>
        </Stat>
        <Stat>
          <h4>Most pooped over*</h4>
          <p>
            <span>
              <strong>{this.winnerName("maxPoo")}</strong>
            </span>
            <span>
              <span className="faded">( {maxPoo.poo_received} </span>
              <Icons src={poo} alt="dislike-icon" />
              <span className="faded">)</span>
            </span>
          </p>
        </Stat>
        <Border />
        <p className="last-line">
          <em>* Since last monday</em>
        </p>
      </StatsWrapper>
    );
  }
}

export default Stats;
