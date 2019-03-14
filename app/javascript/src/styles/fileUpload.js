import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";
import { LightGreyButton } from "./button";

export const FileUploadWrapper = styled(LightGreyButton)`
  font-family: omnes;
  text-align: center;
  position: relative;
  width: 30%;
  align-self: center;
  font-size: 1.6rem;
  width: 25%;
  margin: 0 10px;
`;

FileUploadWrapper.defaultProps = {
  tag: "div"
};
