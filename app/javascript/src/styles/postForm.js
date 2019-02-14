import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";
import { Field, Input } from "./forms";

export const Form = styled.form`
  width: 90%;
  padding: 3%;
`;

// --------------- TEXTAREA ---------------

export const TextareaField = styled(Field)`
  flex-direction: column;
  border: 1px solid ${colors.pink};
  width: 100%;
  border-radius: 8px;
  opacity: 0.8;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;

  &:focus,
  &:hover {
    outline: none;
    opacity: 1;
    border: 2px solid ${colors.deepRed};
    -webkit-box-shadow: 0px 5px 5px 0px rgba(178, 58, 72, 0.5);
    -moz-box-shadow: 0px 5px 5px 0px rgba(178, 58, 72, 0.5);
    box-shadow: 0px 5px 5px 0px rgba(178, 58, 72, 0.5);
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }

  .label {
    top: -6px;
  }

  .border {
    width: 80%;
    display: block;
    height: 1px;
    border: 1px solid lightgrey;
    margin-top: 10px;
  }
`;

export const Textarea = styled.textarea`
  height: 50px;
  resize: initial;
  overflow: auto;
  border: none;
  width: 100%;
  font-weight: 400;
  color: black;
  font-size: 1.3rem;
  line-height: 1.5;

  &:focus {
    height: 150px;
  }
`;
