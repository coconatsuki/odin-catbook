import React from "react";
import PropTypes from "prop-types";
import { userType } from "../API/users";
import ProfileForm from "./ProfileForm";

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

  state = {
    edit: false,
    errorMessages: []
  };

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  refreshProfile = () => {
    console.log("refresh");
  };

  setCommentErrorMessages = message => {
    this.setState({
      errorMessages: [...message]
    });
  };

  render() {
    const { user, isCurrentUser } = this.props;
    return (
      user && (
        <Wrapper>
          <ProfileCard>
            <ProfileCardHeader>
              <h2>About me</h2>
              {isCurrentUser() && <i onClick={this.toggleEdit} />}
            </ProfileCardHeader>
            {this.state.edit ? (
              <ProfileForm
                user={user}
                refreshProfile={this.refreshProfile}
                profileToEdit={user}
                toggleEdit={this.toggleEdit}
                errorMessages={this.state.errorMessages}
                setCommentErrorMessages={this.setCommentErrorMessages}
              />
            ) : (
              <ProfileCardContent>
                <p>
                  <span className="title">My name is </span>
                  <span>{user.name}</span>
                </p>

                {user.breed && (
                  <p>
                    <span className="title">I'm a </span>
                    <span>{user.breed}</span>
                  </p>
                )}
                {user.birthday && (
                  <p>
                    <span className="title">I was born in </span>
                    <span> {user.birthday}</span>
                  </p>
                )}
                {user.city && (
                  <p>
                    <span className="title">I live in </span>
                    <span>
                      {user.city}
                      {user.country && `, ${user.country}`}
                    </span>
                  </p>
                )}
                {!user.city && user.country && (
                  <p>
                    <span className="title">I live in </span>
                    <span>{user.country}</span>
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
            )}
          </ProfileCard>
        </Wrapper>
      )
    );
  }
}

export default AboutMe;
