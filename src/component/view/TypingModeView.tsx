import React from "react";
import { ImgFrame } from "./view-part/ImgFrame";
import { ProblemStringDisplay } from "./view-part/string-display/ProblemStringDisplay";
import { KeyBoard } from "./view-part/KeyBoard";
import { Hands } from "./view-part/Hands";
import { useTypingContext } from "../../hooks/useTypingContext";

export const TypingModeView = () => {
  const {
    inputedCountOfCurrentProblem,
    problems,
    problemIndex,
    nextChar
  } = useTypingContext();
  const problem = problems[problemIndex];
  return (
    <>
      <ImgFrame imgUrl={problem.img} />
      <ProblemStringDisplay
        inputedCountOfCurrentProblem={inputedCountOfCurrentProblem}
        problems={problems}
        problemIndex={problemIndex}
      />
      <KeyBoard nextChar={nextChar} />
      <Hands nextChar={nextChar} />
    </>
  );
};
