import React from "react";
import PropTypes from "prop-types";
import * as moment from "moment";
import { userType } from "../API/users";
import { updateUser } from "../API/users";
import ErrorsBlock from "./ErrorsBlock";
import { Form, Controls } from "../styles/profileForm";
import { Field, Input, TagsField, TagsInput } from "../styles/forms";
import { LightGreyButton, LightRedButton } from "../styles/button";
import { list } from "postcss";

class ProfileForm extends React.Component {
  static propTypes = {
    user: userType.isRequired,
    refreshProfile: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func,
    errorMessages: PropTypes.array.isRequired,
    setCommentErrorMessages: PropTypes.func.isRequired
  };

  state = {
    errorMessages: [],
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

  setErrorMessages = messagesArray => {
    this.setState({
      errorMessages: messagesArray
    });
  };

  handleElementChange = e => {
    const key = e.target.name;
    const value = e.target.value;
    if (key === "thing_i_like" && value === ",") return;
    if (key === "thing_i_hate" && value === ",") return;
    this.setState({
      [key]: value
    });
  };

  removeTagFromList = (list, thing) => {
    const listFromState = this.state[list];
    const thingIndex = listFromState.indexOf(thing);
    const updatedList = listFromState.splice(thingIndex, 1);
    this.setState({
      [thing]: updatedList
    });
  };

  handleArrayChange = e => {
    e.stopPropagation();
    if (e.key === "Enter" || e.key === ",") e.preventDefault();
    if (e.key === "Enter" || e.key === "," || e.type === "blur") {
      const arrayName = e.target.id;
      const elementName = e.target.name;
      const value = e.target.value;
      if (value === "") return;
      this.setState({
        [arrayName]: [...this.state[arrayName], value],
        [elementName]: ""
      });
    }
  };

  handleSave = async e => {
    e.preventDefault();
    const userData = {
      birthday: this.state.birthday,
      breed: this.state.breed,
      country: this.state.country,
      city: this.state.city,
      things_i_like: this.state.things_i_like,
      things_i_hate: this.state.things_i_hate
    };

    const fetchedUser = await updateUser(this.props.user.id, userData);
    if (fetchedUser.errors) {
      this.setErrorMessages(fetchedUser.errors);
    } else {
      this.props.refreshProfile(fetchedUser.user.id);
      this.props.toggleEdit();
    }
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
        <ErrorsBlock errorMessages={this.state.errorMessages} />
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
                    <span>{thing}</span>{" "}
                    <i
                      onClick={() =>
                        this.removeTagFromList("things_i_like", thing)
                      }
                    />
                  </li>
                ))}
              </ul>
              <input
                name="thing_i_like"
                id="things_i_like"
                placeholder="Add a new Tag here, then press Enter or write a coma (',')."
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
                    <span>{thing}</span>
                    <i
                      onClick={() =>
                        this.removeTagFromList("things_i_hate", thing)
                      }
                    />
                  </li>
                ))}
              </ul>
              <input
                name="thing_i_hate"
                id="things_i_hate"
                placeholder="Add a new Tag here, then press Enter or write a coma (',')."
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
