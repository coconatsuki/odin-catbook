import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";
import { Wrapper } from "./global";

export const FriendsWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 2% 1%;

  h1 {
    text-align: center;
    color: ${colors.darkRed};
    font-weight: 600;
    margin-bottom: 25px;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

export const RequestsList = styled.ul`
  list-style: none;
  padding: 3% 3%;
`;

export const RequestItem = styled.li`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 8px 20px;
  border-radius: 30px;
  border: 1px solid #e2d8d87d;
  justify-content: space-between;
  margin-bottom: 20px;
  box-shadow: 0px 8px 5px -7px rgba(140, 47, 57, 0.71);

  span {
    font-weight: 600;
    font-size: 2rem;
    color: ${colors.darkRed};
  }

  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
`;

export const FriendId = styled.div`
  display: flex;
  align-items: center;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
`;
