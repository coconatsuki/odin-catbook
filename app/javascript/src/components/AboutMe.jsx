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
    refreshProfile: PropTypes.func.isRequired,
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
              {isCurrentUser() && !this.state.edit && (
                <i onClick={this.toggleEdit} />
              )}
            </ProfileCardHeader>
            {this.state.edit ? (
              <ProfileForm
                user={user}
                refreshProfile={this.props.refreshProfile}
                profileToEdit={user}
                toggleEdit={this.toggleEdit}
                errorMessages={this.state.errorMessages}
                setCommentErrorMessages={this.setCommentErrorMessages}
              />
            ) : (
              <ProfileCardContent>
                <div className="section">
                  <span className="title">My name is </span>
                  <span>{user.name}</span>
                </div>

                <div className="section">
                  <span className="title">I'm a </span>
                  {user.breed && <span>{user.breed}</span>}
                </div>

                <div className="section">
                  <span className="title">I was born in </span>
                  {user.birthday && <span> {user.birthday}</span>}
                </div>

                <div className="section">
                  <span className="title">I live in </span>
                  {user.city && (
                    <span>
                      {user.city}
                      {user.country && `, ${user.country}`}
                    </span>
                  )}
                </div>

                {!user.city && user.country && (
                  <div className="section">
                    <span className="title">I live in </span>
                    <span>{user.country}</span>
                  </div>
                )}

                <div className="section">
                  <span className="title">I like: </span>
                  {user.things_i_like && user.things_i_like.length > 0 && (
                    <TastesList>
                      {user.things_i_like.map((thing, i) => (
                        <li key={i}> {thing}</li>
                      ))}
                    </TastesList>
                  )}
                </div>

                <div className="section">
                  <span className="title">I hate: </span>
                  {user.things_i_hate && user.things_i_hate.length > 0 && (
                    <TastesList>
                      {user.things_i_hate.map((thing, i) => (
                        <li key={i}> {thing}</li>
                      ))}
                    </TastesList>
                  )}
                </div>
              </ProfileCardContent>
            )}
          </ProfileCard>
        </Wrapper>
      )
    );
  }
}

export default AboutMe;
