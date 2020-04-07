import styled from "@emotion/styled";

export const StringDisplayFrame = styled.div`
  width: 100%;
  height: 150px;
`;

export const StringDisplayContentBackgroundColor = "#c1bdeb";

export const StringDisplayContent = styled.div`
  margin: 5px;
  height: 140px;
  padding: 0 10px 10px 10px;
  border-color: rgb(55, 55, 65);
  border-style: solid;
  border-width: 1px;
  background-color: ${StringDisplayContentBackgroundColor};
`;

export const StringContainer = styled.p`
  font-size: 30px;
`;
