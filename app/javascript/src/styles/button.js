import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";
import { omnes } from "../design/fonts";

const Button = styled.button`
  height: 35px !important;
  -moz-box-shadow: inset 0px 1px 0px 0px #ffffff;
  -webkit-box-shadow: inset 0px 1px 0px 0px #ffffff;
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  border-radius: 20px;
  font-weight: bold;
  padding: 5px 15px;
  &:focus {
    outline: none;
  }
  &:hover {
  }
  &:active {
    position: relative;
    top: 1px;
  }
`;

export const LightGreyButton = styled(Button)`
  background: ${shadows.lightGradient}
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#f5eaea',GradientType=0);
  background-color: #ffffff;
  color: #666666;
  text-shadow: 0px 1px 0px #ffffff;

  &:hover {
    background: linear-gradient(to bottom, #f5eaea 5%, #ffffff 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e9e9e9', endColorstr='#f5eaea',GradientType=0);
    background-color: #f5eaea;
  }
`;

export const LightRedButton = styled(Button)`
  background: ${shadows.darkRedGradient}
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='hsl(354, 50%, 37%)', endColorstr='hsl(353, 51%, 46%)',GradientType=0);
  background-color: ${colors.middleRed};
  color: white;
  /* box-shadow: inset 0px 1px 0px 0px #000;
  border: 1px solid black; */

  &:hover {
    background: ${shadows.darkRedReversedGradient}
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='hsl(353, 51%, 46%)', endColorstr='sl(354, 50%, 37%),GradientType=0);
    background-color: ${colors.deepRed};
  }
`;
