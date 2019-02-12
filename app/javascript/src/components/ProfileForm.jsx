import React from "react";
import PropTypes from "prop-types";
import * as moment from "moment";
import { userType } from "../API/users";
// import { commentType, addComment, updateComment } from "../API/comments";
// import ErrorsBlock from "./ErrorsBlock";
import { Form, Controls } from "../styles/profileForm";
import { Field, Input, TagsField, TagsInput } from "../styles/forms";
import { LightGreyButton, LightRedButton } from "../styles/button";

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
    thing_i_like: "",
    thing_i_hate: "",
    things_i_like: this.props.user.things_i_like
      ? this.props.user.things_i_like
      : [],
    things_i_hate: this.props.user.things_i_hate
      ? this.props.user.things_i_hate
      : []
  };

  componentDidMount = () => {
    const date = moment().subtract(20, "years");
    console.log(date.format("YYYY-MM-DD"));
  };

  handleElementChange = e => {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      [key]: value
    });
  };

  handleArrayChange = e => {
    e.stopPropagation();
    // console.log("event type, native Event", e.type, e.nativeEvent);
    if (e.key === "Enter" || e.key === "," || e.type === "blur") {
      const arrayName = e.target.id;
      const elementName = e.target.name;
      const value = e.target.value;
      console.log(
        "TEST, key, arrayName, elementName,value",
        e.key,
        arrayName,
        elementName,
        value
      );
      this.setState({
        [arrayName]: [...this.state[arrayName], value],
        [elementName]: ""
      });
    }
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
      things_i_hate,
      things_i_like
    } = this.state;
    // if (!this.validBody(body)) return;
    //   const { commentToEdit } = this.props;
    //   this.editComment(body, commentToEdit.id);
    // this.clearState();
    // this.props.setCommentErrorMessages([]);
    // if (this.isEditing()) this.props.toggleEdit();
  };

  birthdayMin = moment()
    .subtract(20, "years")
    .format("YYYY-MM-DD");

  birthdayMax = moment().format("YYYY-MM-DD");

  render() {
    const {
      breed,
      birthday,
      country,
      city,
      thing_i_like,
      thing_i_hate,
      things_i_like,
      things_i_hate
    } = this.state;
    return (
      <Form onSubmit={this.handleSave}>
        <Field>
          <label htmlFor="breed">
            <span className="label">Breed</span>
            <Input
              type="text"
              name="breed"
              id="breed"
              onChange={this.handleElementChange}
              value={breed}
            />
          </label>
        </Field>
        <Field>
          <label htmlFor="birthday">
            <span className="label">Birthday</span>
            <Input
              type="date"
              name="birthday"
              id="birthday"
              onChange={this.handleElementChange}
              value={birthday}
              step="1"
              min={this.birthdayMin}
              max={this.birthdayMax}
            />
          </label>
        </Field>
        <Field>
          <label htmlFor="country">
            <span className="label">Country</span>
            <Input
              type="text"
              name="country"
              id="country"
              onChange={this.handleElementChange}
              value={country}
            />
          </label>
        </Field>
        <Field>
          <label htmlFor="city">
            <span className="label">City</span>
            <Input
              type="text"
              name="city"
              id="city"
              onChange={this.handleElementChange}
              value={city}
            />
          </label>
        </Field>
        <TagsField>
          <label htmlFor="things_i_like">
            <span className="label">Things I like</span>
            <TagsInput>
              <ul>
                {things_i_like.map((thing, i) => (
                  <li key={`thing-${i}`}>
                    <span>{thing}</span> <i />
                  </li>
                ))}
              </ul>
              <input
                name="thing_i_like"
                id="things_i_like"
                onKeyPress={this.handleArrayChange}
                onBlur={this.handleArrayChange}
                onChange={this.handleElementChange}
                value={thing_i_like}
              />
            </TagsInput>
          </label>
        </TagsField>
        <TagsField>
          <label htmlFor="thing_i_hate">
            <span className="label">Things I hate</span>
            <TagsInput>
              <ul>
                {things_i_hate.map((thing, i) => (
                  <li key={`thing-${i}`}>
                    <span>{thing}</span> <i />
                  </li>
                ))}
              </ul>
              <input
                name="thing_i_hate"
                id="things_i_hate"
                onKeyPress={this.handleArrayChange}
                onBlur={this.handleArrayChange}
                onChange={this.handleElementChange}
                value={thing_i_hate}
              />
            </TagsInput>
          </label>
        </TagsField>

        <Controls>
          <LightRedButton type="submit" onClick={this.handleSave}>
            Edit Profile
          </LightRedButton>
          <LightGreyButton onClick={this.props.toggleEdit}>
            Cancel
          </LightGreyButton>
        </Controls>
      </Form>
    );
  }
}

export default ProfileForm;
