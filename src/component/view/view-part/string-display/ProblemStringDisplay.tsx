import React from "react";
import { css } from "emotion";
import styled from "@emotion/styled";

import {
  StringDisplayFrame,
  StringDisplayContent,
  StringContainer
} from "./StringDisplay";

import { Problem } from "../../../../model/problem";

export const ProblemStringDisplay = (props: {
  inputedCountOfCurrentProblem: number;
  problems: Problem[];
  problemIndex: number;
}) => {
  const problem = props.problems[props.problemIndex];
  const barWidth = `${100 -
    (100 * props.problemIndex) / props.problems.length}%`;
  return (
    <StringDisplayFrame>
      <StringDisplayContent>
        <StringContainer>{problem.main}</StringContainer>
        <HiraganaContainer>{problem.kana}</HiraganaContainer>
        <StringContainer>
          {problem.alphabet.split("").map((c, i) => (
            <Alphabet
              key={i}
              char={c}
              inputed={i < props.inputedCountOfCurrentProblem}
            />
          ))}
        </StringContainer>
        <RemainProblemsBar width={barWidth} />
      </StringDisplayContent>
    </StringDisplayFrame>
  );
};

const HiraganaContainer = styled(StringContainer)`
  font-size: 20px;
`;

const RemainProblemsBar = styled.div<{
  width: string;
}>`
  background-color: rgb(72, 18, 160);
  position: relative;
  bottom: -7px;
  height: 5px;
  width: ${props => props.width};
`;

const Alphabet = (props: { char: string; inputed: boolean }) => (
  <span
    className={css`
      color: ${props.inputed ? "rgb(156, 132, 196)" : "inherit"};
    `}
  >
    {props.char}
  </span>
);
