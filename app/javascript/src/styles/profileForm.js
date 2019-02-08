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
    font-size: 1.6rem !important;
  }
`;

export const Input = styled.input`
  width: 60%;
  height: 33px;
  border-radius: 3px;
  font-size: 1.6rem !important;
  margin-bottom: 24px;
  padding: 5px;
`;

export const Controls = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-around;
`;
