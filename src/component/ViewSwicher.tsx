import React from "react";
import { Mode } from "../model/Mode";
import { WaitStartModeView } from "./view/WaitStartModeView";
import { useTypingContext } from "../hooks/useTypingContext";
import { CountDownModeView } from "./view/CountDownModeView";
import { TypingModeView } from "./view/TypingModeView";
import { ResultModeView } from "./view/ResultModeView";

export const ViewSwitcher = () => {
  const { mode } = useTypingContext();
  return mode === Mode.WaitStart ? (
    <WaitStartModeView />
  ) : mode === Mode.CountDown ? (
    <CountDownModeView />
  ) : mode === Mode.Typing ? (
    <TypingModeView />
  ) : mode === Mode.Result ? (
    <ResultModeView />
  ) : (
    <>Unknown Mode !!! [{mode}]</>
  );
};
