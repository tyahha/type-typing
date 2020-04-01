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
import { InputedKana } from "../../../../hooks/useGame";

const flashKeyflame = keyframes`
  50% {
    background-color: rgb(218, 211, 27);
  }
`;

export const ProblemStringDisplay = ({
  inputedKanas,
  inputedKeys,
  remainKeys,
  problems,
  problemIndex
}: {
  inputedKanas: InputedKana[];
  inputedKeys: string;
  remainKeys: string;
  problems: Problem[];
  problemIndex: number;
}) => {
  const { addMissObserver, removeMissObserver } = useTypingContext();
  const [animate, setAnimate] = useState(false);

  const inputedKanaStringLength = inputedKanas.reduce<number>(
    (acc, c) => acc + c.kana.length,
    0
  );

  const allInputedKanaKeys = inputedKanas.reduce<string>(
    (acc, c) => acc + c.key,
    ""
  );

  const allInputedKeyCount = allInputedKanaKeys.length + inputedKeys.length;
  const allKeys = allInputedKanaKeys + remainKeys;

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

  const problem = problems[problemIndex];
  const barWidth = `${100 - (100 * problemIndex) / problems.length}%`;

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
        <HiraganaContainer>
          {problem.kana.split("").map((c, i) => (
            <Charctor key={i} char={c} inputed={i < inputedKanaStringLength} />
          ))}
        </HiraganaContainer>
        <BoldedStringContainer>
          {allKeys.split("").map((c, i) => (
            <Charctor key={i} char={c} inputed={i < allInputedKeyCount} />
          ))}
        </BoldedStringContainer>
        <RemainProblemsBar width={barWidth} />
      </StringDisplayContent>
    </StringDisplayFrame>
  );
};

const HiraganaContainer = styled(StringContainer)`
  font-size: 22px;
`;

const RemainProblemsBar = styled.div<{
  width: string;
}>`
  background-color: rgb(72, 18, 160);
  position: relative;
  bottom: -3px;
  height: 5px;
  width: ${props => props.width};
`;

const BoldedStringContainer = styled(StringContainer)`
  font-weight: bold;
`;

const Charctor = (props: { char: string; inputed: boolean }) => (
  <span
    className={css`
      color: ${props.inputed ? "rgb(156, 132, 196)" : "inherit"};
    `}
  >
    {props.char}
  </span>
);
