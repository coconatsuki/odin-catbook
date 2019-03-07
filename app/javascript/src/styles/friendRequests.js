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
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

export const RequestsList = styled.ul`
  list-style: none;
`;
