import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";
import { Field, Input } from "./forms";
import { LightRedButton } from "./button";

export const Form = styled.form`
  width: 90%;
  padding: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  transition: all 0.2s ease-in;

  &:focus,
  &:hover {
    outline: none;
    opacity: 1;
    border: 1px solid ${colors.deepRed};
    -webkit-box-shadow: 0px 2px 5px 0px rgba(178, 58, 72, 0.5);
    -moz-box-shadow: 0px 2px 5px 0px rgba(178, 58, 72, 0.5);
    box-shadow: 0px 2px 5px 0px rgba(178, 58, 72, 0.5);
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    margin-bottom: 0;
  }

  .label {
    top: -6px;
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
  letter-spacing: 0.04rem;
  line-height: 1.5;
  -webkit-transition: height 0.2s ease-in;
  -moz-transition: height 0.2s ease-in;
  transition: height 0.2s ease-in;

  &:focus {
    height: 150px;
  }
`;

export const ShareButton = styled(LightRedButton)`
  width: 80%;
  font-size: 1.6rem;
`;

export const FileUploadButton = styled.div`
  opacity: 0;
  width: 100%;
  height: ${props => (props.profile === "true" ? "100%" : "33px")};
  position: absolute;
  top: 0;
  left: 0;

  input,
  button {
    width: 100%;
    height: inherit;
  }
`;

export const PicturePreview = styled.div`
  align-self: center;
  margin: 0 15px 15px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 400px;
    max-height: 200px;
  }
`;

export const CatFileUpload = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 15px;

  img {
  }

  button {
    margin: 0 8px;
  }
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 15px;

  button {
    width: ${props => (props.edit ? "20%" : "80%")};
  }
`;
