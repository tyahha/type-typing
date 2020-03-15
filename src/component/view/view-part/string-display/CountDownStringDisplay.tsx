import React from "react";
import styled from "@emotion/styled";

import {
  StringDisplayFrame,
  StringDisplayContent,
  StringContainer
} from "./StringDisplay";

export const CountDownStringDisplay = (props: { count: number }) => (
  <StringDisplayFrame>
    <StringDisplayContent>
      <CountDownStringContainer>{props.count}</CountDownStringContainer>
    </StringDisplayContent>
  </StringDisplayFrame>
);

const CountDownStringContainer = styled(StringContainer)`
  color: rgb(121, 121, 26);
  text-align: center;
  font-size: 90px;
`;
