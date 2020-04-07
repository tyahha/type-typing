import React, { useEffect, useRef } from "react";
import { css } from "emotion";
import styled from "@emotion/styled";

import {
  StringDisplayFrame,
  StringDisplayContent,
  StringContainer,
  StringDisplayContentBackgroundColor
} from "./StringDisplay";

import { Problem } from "../../../../model/problem";
import { useTypingContext } from "../../../../hooks/useTypingContext";
import { InputedKana } from "../../../../hooks/useGame";

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

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const o = () => {
      if (ref.current) {
        ref.current.animate(
          {
            backgroundColor: [
              "rgb(218, 211, 27)",
              StringDisplayContentBackgroundColor
            ]
          },
          {
            duration: 100,
            easing: "ease-in"
          }
        );
      }
    };
    addMissObserver(o);
    return () => {
      removeMissObserver(o);
    };
    // eslint-disable-next-line
  }, [ref]);

  const problem = problems[problemIndex];
  const barWidth = `${100 - (100 * problemIndex) / problems.length}%`;

  return (
    <StringDisplayFrame>
      <StringDisplayContent ref={ref}>
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
