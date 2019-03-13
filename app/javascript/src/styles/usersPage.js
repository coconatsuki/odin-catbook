import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";
import { Wrapper } from "./global";

export const UsersPageWrapper = styled(Wrapper)`
  margin: 2% 1%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const UsersBlock = styled.div`
  width: 60%;

  h1 {
    text-align: center;
    font-weight: 600;
    color: ${colors.darkRed};
    margin-bottom: 25px;
  }
`;

export const UsersWrapper = styled.div`
  /* width: 60%; */
`;

export const UsersList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  list-style: none;
`;

export const UserItem = styled.li`
  display: flex;
  align-items: center;
  width: 45%;
  margin: 2%;
  padding: 2px 25px;
  border: 1px solid ${colors.pink};
  border-radius: 30px;
  background-color: white;
  box-shadow: 0px 8px 5px -7px rgba(140, 47, 57, 0.71);
  -webkit-transition: all 0.1s ease-in;
  -moz-transition: all 0.1s ease-in;
  transition: all 0.1s ease-in;

  &:hover {
    background-color: ${colors.lightGrey};
  }

  a {
    padding: 10px;
    text-decoration: none;
    width: 100%;
  }

  img {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    margin-right: 15px;
  }

  span.name {
    color: ${colors.darkRed};
    font-weight: 600;
    font-size: 1.6rem;
  }

  span.request {
    margin-left: 15px;
    color: black;
    opacity: 0.6;
  }
`;
