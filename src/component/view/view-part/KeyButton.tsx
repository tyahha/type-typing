import styled from "@emotion/styled";

const keyButtonLength = "48px";

export const KeyButton = styled.div<{
  highLight?: boolean;
}>`
  width: ${keyButtonLength};
  height: ${keyButtonLength};
  border-radius: 5px;
  color: ${props => (props.highLight ? "#fff" : "inherit")};
  border-color: rgb(55, 55, 65);
  border-style: solid;
  border-width: 1px;
  text-align: center;
  font-size: 38px;
  line-height: 43px;
  background-color: ${props =>
    props.highLight ? "rgb(158, 104, 34)" : "rgb(185, 204, 230)"};
`;

export const KeyButtonOneHalf = styled(KeyButton)`
  width: 75px;
`;

export const KeyButtonDouble = styled(KeyButton)`
  width: 100px;
`;

export const KeyButtonDoubleHalf = styled(KeyButton)`
  width: 125px;
`;

export const KeyButtonSpace = styled(KeyButton)`
  width: 230px;
  font-size: 35px;
  line-height: 35px;
`;
