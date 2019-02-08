import React from "react";
import PropTypes from "prop-types";
import { userType } from "../API/users";
// import { commentType, addComment, updateComment } from "../API/comments";
// import ErrorsBlock from "./ErrorsBlock";
import { Form, Input, Controls } from "../styles/profileForm";
import { LightGreyButton } from "../styles/global";

class ProfileForm extends React.Component {
  static propTypes = {
    user: userType.isRequired,
    refreshProfile: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func,
    errorMessages: PropTypes.array.isRequired,
    setCommentErrorMessages: PropTypes.func.isRequired
  };

  state = {
    breed: this.props.user.breed ? this.props.user.breed : "",
    birthday: this.props.user.birthday ? this.props.user.birthday : "",
    country: this.props.user.country ? this.props.user.country : "",
    city: this.props.user.city ? this.props.user.city : "",
    things_i_like: this.props.user.things_i_like
      ? this.props.user.things_i_like
      : [],
    things_i_hate: this.props.user.things_i_hate
      ? this.props.user.things_i_hate
      : []
  };

  handleElementChange = (e, key) => {
    const value = e.target.value;
    this.setState({
      [key]: value
    });
  };

  handleArrayChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    const list = value ? value.split(", ") : [];
    this.setState({
      [name]: list
    });
  };

  // validBody = msg => {
  //   const { setCommentErrorMessages } = this.props;
  //   setCommentErrorMessages([]);
  //   if (msg.trim().length === 0) {
  //     setCommentErrorMessages(["Your message can't be empty."]);
  //     return false;
  //   }
  //   if (msg.trim().length <= 5) {
  //     setCommentErrorMessages(["Your message is too short."]);
  //     return false;
  //   }
  //   return true;
  // };

  // editComment = async (body, commentToEditId) => {
  //   const { postId, updateAllComments, setCommentErrorMessages } = this.props;
  //   const fetchedComment = await updateComment(postId, commentToEditId, body);
  //   if (fetchedComment.errors) {
  //     return setCommentErrorMessages(fetchedComment.errors);
  //   }
  //   updateAllComments(fetchedComment.comment);
  // };

  handleSave = async e => {
    e.preventDefault();
    const {
      breed,
      birthday,
      country,
      city,
      things_i_like,
      things_i_hate
    } = this.state;
    // if (!this.validBody(body)) return;
    //   const { commentToEdit } = this.props;
    //   this.editComment(body, commentToEdit.id);
    // this.clearState();
    // this.props.setCommentErrorMessages([]);
    // if (this.isEditing()) this.props.toggleEdit();
  };

  render() {
    return (
      <Form onSubmit={this.handleSave}>
        <label htmlFor="breed" />
        <Input
          type="text"
          name="breed"
          id="breed"
          onChange={this.handleElementChange}
          value={this.state.breed}
        />
        <label htmlFor="birthday" />
        <Input
          type="text"
          name="birthday"
          id="birthday"
          onChange={this.handleElementChange}
          value={this.state.birthday}
        />
        <label htmlFor="country" />
        <Input
          type="text"
          name="country"
          id="country"
          onChange={this.handleElementChange}
          value={this.state.country}
        />
        <label htmlFor="city" />
        <Input
          type="text"
          name="city"
          id="city"
          onChange={this.handleElementChange}
          value={this.state.city}
        />
        <label htmlFor="things_i_like" />
        <Input
          type="text"
          name="things_i_like"
          id="things_i_like"
          onChange={this.handleArrayChange}
          value={this.state.things_i_like}
        />
        <label htmlFor="things_i_hate" />
        <Input
          type="text"
          name="things_i_hate"
          id="things_i_hate"
          onChange={this.handleArrayChange}
          value={this.state.things_i_hate}
        />

        <Controls>
          <LightGreyButton type="submit" onClick={this.handleSave}>
            Edit Profile
          </LightGreyButton>
          <LightGreyButton onClick={this.props.toggleEdit}>
            Cancel
          </LightGreyButton>
        </Controls>
      </Form>
    );
  }
}

export default ProfileForm;
