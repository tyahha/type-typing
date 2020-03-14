import React from "react";
import { TypingContextProvider } from "./TypingContextProvider";
import { ModeSwitcherContainer } from "./container/ModeSwicherContainer";

import styled from "@emotion/styled";

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

const App = () => {
  return (
    <TypingContextProvider>
      <FullDisplay>
        <GameDisplay>
          <ModeSwitcherContainer />
        </GameDisplay>
      </FullDisplay>
    </TypingContextProvider>
  );
};

export default App;
