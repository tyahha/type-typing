import React from "react";
import { TypingContextProvider } from "./TypingContextProvider";
import { ViewSwitcher } from "./component/ViewSwicher";

import styled from "@emotion/styled";

export const App = () => {
  return (
    <TypingContextProvider>
      <FullDisplay>
        <GameDisplay>
          <ViewSwitcher />
        </GameDisplay>
      </FullDisplay>
    </TypingContextProvider>
  );
};

const FullDisplay = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #4e4d5a;
`;

const GameDisplay = styled.div`
  width: 782px;
  height: 100%;
  color: #4e4d5a;
  background-color: #a8a1e7;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
