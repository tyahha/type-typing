import React, { createContext } from "react";
import { Problem } from "./model/problem";
import { Mode } from "./model/Mode";
import { useGame } from "./hooks/useGame";
import { useMissObservable } from "./hooks/useMissObservable";

export const TypingContext = createContext<
  {
    mode: Mode;
    problems: Problem[];
    startTime: number;
    endTime: number;
    misses: Map<string, number>;
    countDownCount: number;
    nextChar: string;
    inputedCountOfCurrentProblem: number;
    problemIndex: number;
  } & Pick<
    ReturnType<typeof useMissObservable>,
    "addMissObserver" | "removeMissObserver"
  >
>({
  mode: Mode.WaitStart,
  problems: [],
  startTime: 0,
  endTime: 0,
  misses: new Map(),
  countDownCount: 0,
  nextChar: "",
  inputedCountOfCurrentProblem: 0,
  problemIndex: 0,
  addMissObserver: () => {},
  removeMissObserver: () => {}
});

export const TypingContextProvider: React.FC = props => {
  const typingContext = useGame();
  return (
    <TypingContext.Provider value={typingContext}>
      {props.children}
    </TypingContext.Provider>
  );
};
