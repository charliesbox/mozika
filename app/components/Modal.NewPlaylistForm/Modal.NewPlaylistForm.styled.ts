import styled from "@emotion/styled";
import { css } from "@emotion/core";

const formCss = css`
  width: 90%;
  height: 50px;
  padding: 1rem;
  background-color: lightgrey;
  border: none;
  border-radius: 3px;
`;

export const Input = styled.input`
  ${formCss};
`;

export const Description = styled.textarea`
  ${formCss};
  height: 30rem;
  margin-top: 1rem;
`;

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow: auto;
`;
