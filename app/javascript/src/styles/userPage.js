import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";
import { Wrapper } from "./global";

export const UserPageWrapper = styled(Wrapper)`
  margin: 0 2% 1%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const FriendsWrapper = styled.div`
  width: 100%;
  padding: 15px;

  li {
    width: 40%;
  }
`;

export const Aside = styled.aside`
  width: 15%;
  height: 200px;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  background: white;
  border: 1px solid ${colors.pink};
  border-radius: 30px;
  margin-top: 2%;
`;

export const CatImg = styled.img`
  width: 200px;
  margin-top: 20px;
  padding-right: 29px;
`;

export const NoContentMessage = styled.div`
  display: flex;
  margin-top: 3%;

  h2 {
    color: ${colors.darkRed};
  }
`;

export const ErrorsBlockWrapper = styled.div`
  h3 {
    font-family: omnes;
    color: red;
    text-align: center;
  }
  margin: 15px 5px 0 5px;
  display: flex;
  flex-direction: column;
`;
