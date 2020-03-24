import React from "react";
import { ImgFrame } from "./view-part/ImgFrame";
import { ProblemStringDisplay } from "./view-part/string-display/ProblemStringDisplay";
import { KeyBoard } from "./view-part/KeyBoard";
import { Hands } from "./view-part/Hands";
import { useTypingContext } from "../../hooks/useTypingContext";

export const TypingModeView = () => {
  const {
    inputedKanas,
    inputedKeys,
    remainKeys,
    problems,
    problemIndex,
    nextChar
  } = useTypingContext();
  const problem = problems[problemIndex];
  return (
    <>
      <ImgFrame imgUrl={problem.img} />
      <ProblemStringDisplay
        inputedKanas={inputedKanas}
        inputedKeys={inputedKeys}
        remainKeys={remainKeys}
        problems={problems}
        problemIndex={problemIndex}
      />
      <KeyBoard nextChar={nextChar} />
      <Hands nextChar={nextChar} />
    </>
  );
};
