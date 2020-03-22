import React from "react";
import { ImgFrame } from "./view-part/ImgFrame";
import { ProblemStringDisplay } from "./view-part/string-display/ProblemStringDisplay";
import { KeyBoard } from "./view-part/KeyBoard";
import { Hands } from "./view-part/Hands";
import { useTypingContext } from "../../hooks/useTypingContext";

export const TypingModeView = () => {
  const {
    inputedKeysOfCurrentProblem,
    problems,
    problemIndex,
    nextChar,
    keysCandidate
  } = useTypingContext();
  const problem = problems[problemIndex];
  return (
    <>
      <ImgFrame imgUrl={problem.img} />
      <ProblemStringDisplay
        inputedKeysOfCurrentProblem={inputedKeysOfCurrentProblem}
        problems={problems}
        problemIndex={problemIndex}
        keysCandidate={keysCandidate}
      />
      <KeyBoard nextChar={nextChar} />
      <Hands nextChar={nextChar} />
    </>
  );
};
