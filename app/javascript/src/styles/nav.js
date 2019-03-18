import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";
import catbookLogo from "../images/catbook-logo.png";

export const Navigation = styled.nav`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.darkRed};
  padding: 5px 0;
`;

export const List = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 0;
  padding-left: 0;
  padding-right: 120px;
  width: 48%;
  height: 100%;
  z-index: 2;
`;

export const Highlight = styled.span`
  transition: all 0.2s;
  position: absolute;
  top: 0;
  left: 0;
  background: ${shadows.lightGradient};
  z-index: 1;
  border-radius: 3px;
  display: ${props => (props.displayHighlight ? "block" : "none")};
  width: ${props => `${props.listCoordinates.width}px`};
  height: ${props => `${props.listCoordinates.height}px`};
  transform: ${props =>
    `translate(${props.listCoordinates.left}px, ${
      props.listCoordinates.top
    }px)`};
`;

export const ListElement = styled.li`
  position: relative;
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  border-radius: 3px;
  min-width: 150px;

  a {
    color: ${props => (props.active ? colors.darkRed : "white")};
    display: block;
    text-decoration: none;
    padding: 1.5em;
    transition: color 0.2s;
  }

  &:hover {
    a {
      color: ${colors.darkRed};
    }
  }
  background: ${props => props.active && shadows.lightGradient};
`;

export const Logo = styled.a`
  display: flex;
  height: 24px;
  width: 24px;
  margin-left: 120px;
  background-color: black;

  i {
    display: block;
    height: inherit;
    width: inherit;
    background: url(${catbookLogo});
    background-size: contain;
    border-radius: 2px;
  }
`;
