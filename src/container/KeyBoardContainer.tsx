import React from "react";
import { css } from "emotion";

import { KeyLine } from "../component/key-line";
import { KeyButton } from "../component/key-button";
import {
  KeyButtonOneHalf,
  KeyButtonDouble,
  KeyButtonDoubleHalf,
  KeyButtonSpace
} from "../component/key-button/KeyButton";
import { KeyContainer } from "./KeyContainer";

const line1Keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"];
const line2Keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "@"];
const line3Keys = ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", ":"];
const line4Keys = ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "\\"];

export const containKeyLines = (c: string): boolean =>
  line1Keys.includes(c) ||
  line2Keys.includes(c) ||
  line3Keys.includes(c) ||
  line4Keys.includes(c);

export const KeyBoardContainer = ({ nextChar }: { nextChar: string }) => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 260px;
      `}
    >
      <KeyLine>
        <KeyButton />
        {line1Keys.map(c => (
          <KeyContainer key={c} char={c} nextChar={nextChar} />
        ))}
        <KeyButton />
        <KeyButton />
        <KeyButton />
      </KeyLine>
      <KeyLine>
        <KeyButtonOneHalf />
        {line2Keys.map(c => (
          <KeyContainer key={c} char={c} nextChar={nextChar} />
        ))}
        <KeyButton />
        <KeyButtonOneHalf />
      </KeyLine>
      <KeyLine>
        <KeyButtonDouble />
        {line3Keys.map(c => (
          <KeyContainer key={c} char={c} nextChar={nextChar} />
        ))}
        <KeyButton />
        <KeyButton />
      </KeyLine>
      <KeyLine>
        <KeyButtonDoubleHalf />
        {line4Keys.map(c => (
          <KeyContainer key={c} char={c} nextChar={nextChar} />
        ))}
        <KeyButtonOneHalf />
      </KeyLine>
      <KeyLine>
        <KeyButtonOneHalf />
        <KeyButton />
        <KeyButton />
        <KeyButton />
        <KeyButtonSpace highLight={nextChar === "space"}>space</KeyButtonSpace>
        <KeyButton />
        <KeyButton />
        <KeyButtonOneHalf />
        <KeyButton />
        <KeyButtonOneHalf />
      </KeyLine>
    </div>
  );
};
