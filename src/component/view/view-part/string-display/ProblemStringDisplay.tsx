import React, { useEffect, useState } from "react";
import { css, keyframes } from "emotion";
import styled from "@emotion/styled";

import {
  StringDisplayFrame,
  StringDisplayContent,
  StringContainer
} from "./StringDisplay";

import { Problem } from "../../../../model/problem";
import { useTypingContext } from "../../../../hooks/useTypingContext";

const flashKeyflame = keyframes`
  50% {
    background-color: rgb(218, 211, 27);
  }
`;

export const ProblemStringDisplay = (props: {
  inputedCountOfCurrentProblem: number;
  problems: Problem[];
  problemIndex: number;
}) => {
  const { addMissObserver, removeMissObserver } = useTypingContext();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const secondMissObserver = () => {
      setAnimate(false);
      window.requestAnimationFrame(function() {
        window.requestAnimationFrame(function() {
          setAnimate(true);
        });
      });
    };
    const firstMissObserver = () => {
      setAnimate(true);
      removeMissObserver(firstMissObserver);
      addMissObserver(secondMissObserver);
    };
    addMissObserver(firstMissObserver);
    return () => {
      removeMissObserver(firstMissObserver);
      removeMissObserver(secondMissObserver);
    };
    // eslint-disable-next-line
  }, []);

  const problem = props.problems[props.problemIndex];
  const barWidth = `${100 -
    (100 * props.problemIndex) / props.problems.length}%`;

  return (
    <StringDisplayFrame>
      <StringDisplayContent
        className={css(
          animate
            ? {
                animation: `${flashKeyflame} 0.1s ease-in`,
                animationIterationCount: 1
              }
            : undefined
        )}
      >
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
