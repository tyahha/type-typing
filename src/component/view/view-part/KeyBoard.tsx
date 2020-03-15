import React from "react";
import { css } from "emotion";
import styled from "@emotion/styled";

import {
  KeyButton,
  KeyButtonOneHalf,
  KeyButtonDouble,
  KeyButtonDoubleHalf,
  KeyButtonSpace
} from "./KeyButton";

import {
  line1Keys,
  line2Keys,
  line3Keys,
  line4Keys
} from "../../../model/Keys";

export const KeyBoard = ({ nextChar }: { nextChar: string }) => {
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
        <Keys chars={line1Keys} nextChar={nextChar} />
        <KeyButton />
        <KeyButton />
        <KeyButton />
      </KeyLine>
      <KeyLine>
        <KeyButtonOneHalf />
        <Keys chars={line2Keys} nextChar={nextChar} />
        <KeyButton />
        <KeyButtonOneHalf />
      </KeyLine>
      <KeyLine>
        <KeyButtonDouble />
        <Keys chars={line3Keys} nextChar={nextChar} />
        <KeyButton />
        <KeyButton />
      </KeyLine>
      <KeyLine>
        <KeyButtonDoubleHalf />
        <Keys chars={line4Keys} nextChar={nextChar} />
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

const KeyLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Keys = ({ chars, nextChar }: { nextChar: string; chars: string[] }) => (
  <>
    {chars.map(c => (
      <KeyButton key={c} highLight={c === nextChar}>
        {c}
      </KeyButton>
    ))}
  </>
);
