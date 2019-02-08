import React from "react";
import PropTypes from "prop-types";
import { userType } from "../API/users";
import {
  Wrapper,
  TastesList,
  ProfileCard,
  ProfileCardHeader,
  ProfileCardContent
} from "../styles/aboutMe";
import * as moment from "moment";

class AboutMe extends React.Component {
  static propTypes = {
    user: userType.isRequired,
    isCurrentUser: PropTypes.func.isRequired
  };

  state = {};

  render() {
    const { user } = this.props;
    return (
      user && (
        <Wrapper>
          <ProfileCard>
            <ProfileCardHeader>
              <h2>About me</h2>
            </ProfileCardHeader>
            <ProfileCardContent>
              <p>
                <span className="title">My name is </span>
                {user.name}.
              </p>

              {user.breed && (
                <p>
                  <span className="title">I'm a </span>
                  <span>{user.breed}.</span>
                </p>
              )}
              {user.birthday && (
                <p>
                  <span className="title">I was born in </span>
                  <span> {user.birthday}.</span>
                </p>
              )}
              {user.city && (
                <p>
                  <span className="title">I live in </span> {user.city}
                  {user.country && `, ${user.country}`}.
                </p>
              )}
              {!user.city && user.country && (
                <p>
                  <span className="title">I live in </span>
                  <span>{user.country}.</span>
                </p>
              )}

              {user.things_i_like.length > 0 && (
                <p>
                  <span className="title">I like: </span>
                  <TastesList>
                    {user.things_i_like.map((thing, i) => (
                      <li key={i}> {thing}</li>
                    ))}
                  </TastesList>
                </p>
              )}
              {user.things_i_hate.length > 0 && (
                <p>
                  <span className="title">I hate: </span>
                  <TastesList>
                    {user.things_i_hate.map((thing, i) => (
                      <li key={i}> {thing}</li>
                    ))}
                  </TastesList>
                </p>
              )}
            </ProfileCardContent>
          </ProfileCard>
        </Wrapper>
      )
    );
  }
}

export default AboutMe;
