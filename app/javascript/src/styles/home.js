import React from "react";
import styled from "styled-components";
import { css } from "@emotion/core";
import { colors, shadows } from "../design/colors";
import { Wrapper } from "./global";
import { Img } from "../styles/like";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
`;

export const HomeWrapper = styled(Wrapper)`
  margin: 2% 1%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  .left-aside {
    width: 15%;
  }
  .right-aside {
    width: 25%;
    position: sticky;
    top: 5%;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  border: 1px solid ${colors.pink};
  border-radius: 30px;
  background-color: white;
`;

export const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid ${colors.pink};
  border-radius: 30px;
  padding: 15px;
  width: 100%;
  height: 453px;

  h3 {
    color: ${colors.darkRed};
    text-align: center;
    margin: 0;
    font-weight: 600;
  }

  .subtitle {
    margin: 5px 0 10px 0;
    font-weight: 400;
  }

  p.last-line {
    margin-bottom: 0;
  }
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;

  h4 {
    text-align: center;
    color: ${colors.darkRed};
    margin-bottom: 5px;
  }

  p {
    display: flex;
    justify-content: space-between;
  }

  p span {
    flex-grow: 1;
  }

  p span:first-child {
    color: ${colors.middleRed};
    text-align: left;
    padding-left: 10px;
    font-size: 1.6rem;
  }

  p span:last-child {
    text-align: right;
    padding-right: 10px;
    font-size: 1.5rem;
  }

  .faded {
    opacity: 0.5;
  }
`;

export const Icons = styled(Img)`
  margin: 0 3px;
`;

export const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 90%;
`;

export const spinner = css`
  border: 4px solid;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  height: inherit;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
