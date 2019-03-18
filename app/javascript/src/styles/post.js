import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";

export const PostArticle = styled.div`
  width: 95%;
  position: relative;
  margin: 6px 0;
`;

export const Controls = styled.div`
  display: flex;
  position: absolute;
  right: 15px;
  z-index: 2;

  button {
    padding-top: 0;
    border: none;
    color: ${colors.editBlue};
    padding: 5px 10px;
    border-radius: 5px;
    -webkit-transition: all 0.2s ease-in;
    -moz-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
    background-color: transparent;
    font-size: 1.3rem;

    &:hover {
      background-color: ${colors.lightGrey};
      color: black;
    }

    button:last-child {
      margin-right: 10px;
    }
  }
`;

export const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: white;
  border: 1px solid ${colors.pink};
  border-radius: 30px;
  margin-top: 2%;
  padding: 10px;

  article {
    display: flex;
    flex-direction: column;
    width: 90%;
  }
`;

export const PostHeader = styled.div`
  h3 {
    margin: 0;
  }

  span {
    opacity: 0.5;
    font-size: 1.2rem;
  }
`;

export const PostContent = styled.p`
  word-wrap: break-word;
  font-size: 1.6rem;
  margin: 15px 0;
`;

export const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 400px;
    max-height: 300px;
  }
`;

export const PostInfo = styled.div`
  display: flex;

  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }

  div {
    padding-top: 4px;
  }

  a {
    color: ${colors.darkRed};
    &:hover {
      color: ${colors.editBlue};
    }
  }
`;
