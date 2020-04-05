import React from "react";
import { TypingContext } from "./TypingContextProvider";
import { problems } from "./assets/problems";
import { Mode } from "./model/Mode";

export const TypingMockContextProvider: React.FC = props => (
  <TypingContext.Provider
    value={{
      mode: Mode.WaitStart,
      startTime: 0,
      endTime: 1234567,
      problems: problems,
      problemIndex: 3,
      completeProblemInputs: [],
      misses: new Map([["K", 3]]),
      inputedKanas: [],
      inputedKeys: "",
      countDownCount: 3,
      nextChar: "T",
      remainKeys: "TEST",
      addMissObserver: () => {},
      removeMissObserver: () => {}
    }}
  >
    {props.children}
  </TypingContext.Provider>
);
