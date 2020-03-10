import React from "react";
import { ImgFrame } from "../component/img-frame";
import { StringDisplay } from "../component/string-display";
import { KeyBoardContainer } from "./KeyBoardContainer";
import { Hands } from "../component/hands";
import { useTypingContext } from "../hooks/useTypingContext";

export const TypingDisplayContainer = () => {
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
      <StringDisplay
        inputedCountOfCurrentProblem={inputedCountOfCurrentProblem}
        problems={problems}
        problemIndex={problemIndex}
      />
      <KeyBoardContainer nextChar={nextChar} />
      <Hands nextChar={nextChar} />
    </>
  );
};
