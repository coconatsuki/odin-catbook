import React from "react";
import styled from "styled-components";
import { css } from "@emotion/core";
import { colors, shadows } from "../design/colors";

export const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 100%;
  box-shadow: 0px 10px 9px -4px rgba(140, 47, 57, 0.71);
`;

export const TopControl = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
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

export const CroppingBar = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 10%;
  margin-bottom: 0;
  border: 1px solid hsl(6, 93%, 84%);
  border-radius: 0 0 3px 3px;
  border-top: none;
  background: linear-gradient(to bottom, #ffffff 5%, #f5eaea 100%);

  button {
    width: 25%;
    height: 85% !important;
    font-size: 1.6rem;
  }
`;

export const ProfileCroppingControls = styled.div`
  display: flex;
  justify-content: space-around;

  button {
    z-index: 2;
  }
`;

export const SpinnerWrapper = styled.div`
  margin-left: 20px;
  margin-bottom: 20px;
  z-index: 4000;

  /* div {
    border: 4px solid;
  } */
`;

export const spinner = css`
  border: 4px solid;
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
  pointer-events: ${props => props.disabled && "none"};
  opacity: ${props => props.disabled && props.active && "0.8"};

  a {
    font-size: 1.7rem;
    text-decoration: none;
    padding: 1em;
    cursor: pointer;
    color: ${props => (props.active ? "white" : colors.darkRed)};
  }

  .paw {
    display: ${props => (props.active || props.disabled) && "none"};
    -webkit-transition: all 0.2s ease-in;
    -moz-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
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
`;

export const CoverPicWrapper = styled.div`
  position: relative;
  height: 260px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`;

export const CoverPic = styled.div`
  width: 100%;
  height: 260px;
  position: absolute;
  background-color: ${colors.pink};
  background-image: url(${props => props.imageUrl && props.imageUrl});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const ProfilePicWrapper = styled.div`
  position: relative;
  width: 168px;
  height: 168px;
  margin-bottom: -30px;
  margin-left: 20px;
  z-index: 1;
  border-radius: 50%;
  box-shadow: 0px 10px 9px -4px rgba(140, 47, 57, 0.71);
`;

export const CropProfileWrapper = styled.div`
  position: relative;
  width: 168px;
  height: 208px;
  margin-bottom: -30px;
  margin-left: 20px;
  z-index: 1;
  border-radius: 50%;
  box-shadow: 0px 10px 9px -4px rgba(140, 47, 57, 0.71);
`;

export const ProfilePicUploadWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: inherit;
  bottom: 0;
  z-index: 2;
  border-radius: 50%;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;

  p {
    display: none;
    text-align: center;
    font-size: 2.5rem;
    font-weight: 600;
    color: white;
  }

  &:hover {
    background-color: rgba(140, 47, 57, 0.71);

    p {
      display: block;
    }
  }
`;

export const ProfilePic = styled.div`
  background-color: ${colors.deepRed};
  background: ${colors.deepRed}
    url(${props => props.imageUrl && props.imageUrl}) no-repeat;
  background-size: cover;
  background-position: ${props => props.default && "-27px 20px"};
  border-radius: 50%;
  width: inherit;
  height: inherit;
`;

export const CoverFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  margin: 10px;
  z-index: 2;
  color: white;

  p {
    font-size: 4em;
    text-shadow: 0px 1px 0px #000;
  }

  button {
    height: 30px;
  }
`;
