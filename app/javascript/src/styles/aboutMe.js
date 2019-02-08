import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5%;
  width: 80%;
  font-size: 4rem;
`;

export const ProfileCard = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 3px;
  border: 1px solid ${colors.pink};
`;

export const TastesList = styled.ul`
  padding-left: 0;
  width: 50%;

  li {
    margin-bottom: 15px;
  }
`;

export const ProfileCardHeader = styled.header`
  border-bottom: 1px solid ${colors.pink};
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 4%;

  h2 {
    color: ${colors.darkRed};
    margin: 0;
    padding: 15px;
  }
`;

export const ProfileCardContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 15%;
  font-size: 1.6rem;

  span.title {
    color: #90949c;
  }

  span {
    width: 50%;
    display: block;
  }

  p {
    margin-bottom: 18px;
    display: flex;
  }
`;
