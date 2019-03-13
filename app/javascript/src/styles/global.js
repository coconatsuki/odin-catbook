import React from "react";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";
import { omnes } from "../design/fonts";

export const Body = createGlobalStyle`
  body {
    background-color: ${colors.lightRed};
    overflow: scroll;
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

  input,
  textarea,
  button {
    &:focus {
      outline: none;
    }
  }
`;

export const Border = styled.span`
  opacity: 0.7;
  width: 100%;
  display: block;
  height: 1px;
  border-bottom: 1px solid lightgrey;
  margin: 5px 0;
`;

export const Aside = styled.aside`
  width: 20%;

  &.left-aside {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const CatImg = styled.img`
  width: 200px;
`;
