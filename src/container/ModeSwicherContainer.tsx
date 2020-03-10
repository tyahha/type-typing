import React from "react";
import { Mode } from "../model/Mode";
import { WaitStartDisplayContainer } from "./WaitStartDisplayContainer";
import { useTypingContext } from "../hooks/useTypingContext";
import { CountDownDisplayContainer } from "./CountDownDisplayContainer";
import { TypingDisplayContainer } from "./TypingDisplayContainer";
import { ResultDisplay } from "../component/result-display/resultDisplay";

export const ModeSwitcherContainer = () => {
  const { mode } = useTypingContext();
  return mode === Mode.WaitStart ? (
    <WaitStartDisplayContainer />
  ) : mode === Mode.CountDown ? (
    <CountDownDisplayContainer />
  ) : mode === Mode.Typing ? (
    <TypingDisplayContainer />
  ) : mode === Mode.End ? (
    <ResultDisplay />
  ) : (
    <>Unknown Mode !!! [{mode}]</>
  );
};
