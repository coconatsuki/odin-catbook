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
  background: ${shadows.lightGradient};
`;

export const NavElements = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  height: inherit;
  width: 50%;
  transition: all 0.3s ease;
  transition-property: transform, font-size;
  z-index: 2;

  a {
    font-size: 1.7rem;
    text-decoration: none;
    padding: 1em;
    cursor: pointer;
    color: ${props => (props.active ? "white" : colors.darkRed)};
  }

  .paw {
    transition: all 0.3 ease;
  }

  &:hover {
    font-size: 1.2em;
    transform: scale(1.1);
    background: ${props => props.active && colors.darkRed};
    a {
      color: ${props => (props.active ? "white" : colors.darkRed)};
    }
    .paw {
      opacity: ${props => (props.active ? "0" : "1")};
      visibility: ${props => (props.active ? "collapse" : "initial")};
      transform: translateY(-40px);
    }
  }
  background-color: ${props => props.active && colors.darkRed};
`;

export const ElementWrapper = styled.li`
  display: flex;
  justify-content: center;
  width: ${700 / 3}px;
  height: inherit;
`;

export const NavCat1 = styled.img`
  display: ${props => (props.active ? "block" : "none")};
  position: absolute;
  top: -29px;
  left: -17px;
`;

export const NavCat2 = styled.img`
  display: ${props => (props.active ? "block" : "none")};
  position: absolute;
  top: -43px;
  left: -17px;
`;

export const NavCat3 = styled.img`
  display: ${props => (props.active ? "block" : "none")};
  position: absolute;
  top: -29px;
  left: 29px;
`;

export const CatPaw = styled.img`
  padding: 0.6em 3em;
  visibility: collapse;
  opacity: 0;
  position: absolute;
  transition: transform 0.3 ease;
  &:hover {
    opacity: ${props => (props.active ? "0" : "1")};
    visibility: ${props => (props.active ? "collapse" : "initial")};
    transform: translateY(-40px);
  }
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
  margin: 10px 15px;

  p {
    font-size: 2em;
  }

  button {
    height: 30px;
  }
`;
