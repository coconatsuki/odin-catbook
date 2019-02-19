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
