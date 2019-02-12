import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 35px;

  input,
  button {
    font-size: 1.5rem !important;
  }
`;

export const Field = styled.div`
  width: 85%;
  position: relative;
  display: flex;

  label {
    width: 100%;
  }

  span {
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

export const Input = styled.input`
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

export const Controls = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-around;
`;
