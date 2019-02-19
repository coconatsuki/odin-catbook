import React from "react";
import styled from "styled-components";
import { colors, shadows } from "../design/colors";
import { Controls } from "../styles/post";
import { ShareButton } from "../styles/postForm";

export const Textarea = styled.input`
  width: 824px;
  border-radius: 30px;
  max-width: 100%;
  min-width: 100%;
  height: 45px;
  min-height: 45px;
  border: 1px solid ${colors.pink};
  font-family: omnes-pro;
  line-height: 2.2rem;
  font-size: 1.5rem;
  padding: 12px;
  background-color: ${colors.lightRed};
`;

export const Counter = styled(Controls)`
  margin-top: 15px;
  justify-content: center;
`;

export const CommentControls = styled(Controls)`
  button:hover {
    background-color: transparent;
  }
`;

export const Article = styled.article`
  background-color: ${colors.lightRed};
  border-radius: 30px;
  margin-top: 15px;
`;

export const EditComment = styled(ShareButton)``;
