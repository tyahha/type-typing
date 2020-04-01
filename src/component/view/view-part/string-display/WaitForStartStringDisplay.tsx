import React from "react";
import styled from "@emotion/styled";

import {
  StringDisplayFrame,
  StringDisplayContent,
  StringContainer
} from "./StringDisplay";

export const WaitForStartStringDisplay = () => (
  <StringDisplayFrame>
    <StringDisplayContent>
      <WaitStringContainer>スペースキーで開始</WaitStringContainer>
    </StringDisplayContent>
  </StringDisplayFrame>
);

const WaitStringContainer = styled(StringContainer)`
  color: rgb(121, 121, 26);
  text-align: center;
  margin: 45px;
`;
