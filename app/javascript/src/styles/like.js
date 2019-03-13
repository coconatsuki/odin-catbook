import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";
import bigHeart from "../images/big-heart.png";
import poo from "../images/poo.png";
import darkBigHeart from "../images/dark-big-heart.png";

export const Wrapper = styled.section``;

export const Counters = styled.div`
  display: flex;

  .counter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 30px;
  }

  .counter:first-child {
    margin-right: 25px;
  }
`;

export const Img = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 3px;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
`;

const Button = styled.button`
  display: flex;
  border: none;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  color: ${colors.darkRed};
  padding: 5px;
  border-radius: 3px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
  transition-property: transform, background-color, background-image, display;

  &:hover {
    background-color: ${colors.lightGrey};
    i {
      transform: scale(1.2);
    }
  }

  i {
    display: block;
    height: 24px;
    width: 24px;
    background-size: contain;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
`;

export const LikeButton = styled(Button)`
  display: ${props => (props.show ? "flex" : "none")};
  width: ${props => (props.remove ? "127px" : "73px")};

  i {
    background-image: url(${bigHeart});
  }
`;

export const DislikeButton = styled(Button)`
  display: ${props => (props.show ? "flex" : "none")};
  width: ${props => (props.remove ? "146px" : "90px")};
  i {
    background-image: url(${poo});
  }
`;
