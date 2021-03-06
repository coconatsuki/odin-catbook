import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";
import deleteGray from "../images/delete-gray.png";
import deleteBlack from "../images/delete-black.png";

export const Field = styled.div`
  width: 85%;
  position: relative;
  display: flex;

  label {
    width: 100%;
  }

  .label {
    font-size: 1.3rem;
    font-weight: 400;
    color: darkgray;
    top: 8px;
    left: 10px;
    z-index: 5;
    padding: 0 5px;
    background-color: white;
    position: absolute;
  }
`;

const e = React.createElement;

export const Input = styled(({ tag, children, ...props }) =>
  e(tag, props, children)
)`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  font-weight: 400;
  font-size: 1.5rem !important;
  margin-bottom: 24px;
  padding: 10px;
  border: 1px solid ${colors.pink};
  opacity: 0.8;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  &:focus,
  &:hover {
    outline: none;
    opacity: 1;
    border: 2px solid ${colors.deepRed};
    -webkit-box-shadow: 0px 5px 5px 0px rgba(178, 58, 72, 0.5);
    -moz-box-shadow: 0px 5px 5px 0px rgba(178, 58, 72, 0.5);
    box-shadow: 0px 5px 5px 0px rgba(178, 58, 72, 0.5);
  }
`;

Input.defaultProps = {
  tag: "input"
};

// --------------- TAGS ---------------

export const TagsField = styled(Field)`
  .label {
    top: -8px;
  }

  div {
    height: inherit;
  }
`;

export const TagsInput = styled(Input)`
  display: flex;
  flex-direction: column;

  .label {
    top: -8px;
  }

  ul {
    display: flex;
    margin-bottom: 0;
    padding-left: 0;
    flex-wrap: wrap;
  }

  li {
    display: flex;
    align-items: center;
    margin-right: 10px;
    border: 1px solid lightgrey;
    padding: 2px 8px;
    border-radius: 8px;
    margin-top: 5px;

    span:first-child {
      padding-right: 6px;
    }

    i {
      display: block;
      height: 10px;
      width: 10px;
      padding: 5px;
      background: url(${deleteGray});
      background-size: contain;
      -webkit-transition: background 0.2s ease-in;
      -moz-transition: background 0.2s ease-in;
      transition: background 0.2s ease-in;

      &:hover {
        background: url(${deleteBlack});
        background-size: contain;
      }
    }
  }

  input {
    border: none;
    margin-top: 10px;
    height: 100%;
  }
`;

TagsInput.defaultProps = {
  tag: "div"
};
