import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";
import { Wrapper } from "./global";

export const Aside = styled.aside`
  width: 20%;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
`;

export const PostsWrapper = styled(Wrapper)`
  margin: 2% 1%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  border: 1px solid ${colors.pink};
  border-radius: 30px;
  background-color: white;
`;

export const Img = styled.img`
  width: 250px;
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid ${colors.pink};
  border-radius: 30px;
  padding: 30px;
  align-items: center;
  width: 80%;
`;
