import React from "react";
import { ImgFrame } from "../component/img-frame";
import { StringDisplay } from "../component/string-display";
import { Problem } from "../model/problem";
import { KeyBoardContainer } from "./KeyBoardContainer";
import { Hands } from "../component/hands";

export const TypingDisplayContainer = ({
  inputedCountOfCurrentProblem,
  problems,
  problemIndex
}: {
  inputedCountOfCurrentProblem: number;
  problems: Problem[];
  problemIndex: number;
}) => {
  const problem = problems[problemIndex];
  const nextChar = problem.alphabet[inputedCountOfCurrentProblem];
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
