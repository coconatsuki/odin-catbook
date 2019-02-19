import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";

export const Controls = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    border: none;
    color: ${colors.editBlue};
    padding: 5px 10px;
    border-radius: 5px;
    -webkit-transition: all 0.2s ease-in;
    -moz-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
    background-color: transparent;

    &:hover {
      background-color: ${colors.lightGrey};
      color: black;
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
  padding: 20px;

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
  font-size: 1.6rem;
  margin: 15px 0;
`;
