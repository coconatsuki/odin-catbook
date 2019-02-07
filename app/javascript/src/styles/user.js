import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 80%;
  box-shadow: 0px 10px 9px -4px rgba(140, 47, 57, 0.71);
`;

export const ProfileNav = styled.ul`
  height: 40px;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0 50px 0 238px;
  margin-bottom: 0;
  border: 1px solid ${colors.pink};
  border-radius: 0 0 3px 3px;
  border-top: none;
  background: ${shadows.lightGradient}
  justify-content: space-evenly;
`;

export const NavElements = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 3px;
  height: inherit;
  transition: all 0.3s ease;
  transition-property: transform, font-size;

  a {
    text-decoration: none;
    padding: 1em;
    cursor: pointer;
    color: ${props => (props.active ? "white" : colors.darkRed)};
  }

  &:hover {
    transform: scale(1.1);
    font-size: 1.2em;
    background: ${props => props.active && colors.darkRed};
    a {
      color: ${props => (props.active ? "white" : colors.darkRed)};
    }
  }
  background-color: ${props => props.active && colors.darkRed};
`;

export const NavCat = styled.img`
  display: ${props => (props.active ? "block" : "none")};
  position: absolute;
  top: -29px;
  left: -17px;
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

export const CoverPic = styled.div`
  height: 260px;
  background-color: ${colors.pink};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const ProfilePic = styled.div`
  margin-bottom: -30px;
  margin-left: 20px;
  background-color: red;
  border-radius: 50%;
  width: 168px;
  height: 168px;
  z-index: 1;
  box-shadow: 0px 10px 9px -4px rgba(140, 47, 57, 0.71);
`;

export const CoverFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  margin: 5px 15px;

  p {
    font-size: 2em;
  }

  button {
    height: 30px;
  }
`;
