import React from "react";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";
import { omnes } from "../design/fonts";

export const Body = createGlobalStyle`
  body {
    background-color: ${colors.lightRed};
  }
`;

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 7% 2% 7%;

  a,
  p,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  button {
    font-family: ${omnes.basic};
  }
`;

export const LightGreyButton = styled.button`
  height: 33px !important;
  -moz-box-shadow: inset 0px 1px 0px 0px #ffffff;
  -webkit-box-shadow: inset 0px 1px 0px 0px #ffffff;
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: ${shadows.lightGradient}
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#f5eaea',GradientType=0);
  background-color: #ffffff;
  border-radius: 3px;
  color: #666666;
  font-weight: bold;
  padding: 5px 15px;
  text-shadow: 0px 1px 0px #ffffff;

  &:hover {
    background: linear-gradient(to bottom, #f5eaea 5%, #ffffff 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e9e9e9', endColorstr='#f5eaea',GradientType=0);
    background-color: #f5eaea;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`;
