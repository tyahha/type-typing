import React from "react";

import style from "../App.module.scss";

import { KeyLine } from "../component/key-line";
import { KeyButton } from "../component/key-button";
import { KeyButtonOneHalf, KeyButtonDouble, KeyButtonDoubleHalf, KeyButtonSpace } from "../component/key-button/KeyButton";
import { KeyContainer } from "./KeyContainer";

const line1Keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"];
const line2Keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "@"];
const line3Keys = ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", ":"];
const line4Keys = ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "\\"];

export const KeyBoardContainer = () => {
  const nextInputChar = "S";
  return (
    <div className={style.keyLineContainer}>
      <KeyLine>
        <KeyButton />
        {
          line1Keys.map(c => <KeyContainer char={c} nextInputChar={nextInputChar} />)
        }
        <KeyButton />
        <KeyButton />
        <KeyButton />
      </KeyLine>
      <KeyLine>
        <KeyButtonOneHalf />
        {
          line2Keys.map(c => <KeyContainer char={c} nextInputChar={nextInputChar} />)
        }
        <KeyButton />
        <KeyButtonOneHalf />
      </KeyLine>
      <KeyLine>
        <KeyButtonDouble />
        {
          line3Keys.map(c => <KeyContainer char={c} nextInputChar={nextInputChar} />)
        }
        <KeyButton />
        <KeyButton />
      </KeyLine>
      <KeyLine>
        <KeyButtonDoubleHalf />
        {
          line4Keys.map(c => <KeyContainer char={c} nextInputChar={nextInputChar} />)
        }
        <KeyButtonOneHalf />
      </KeyLine>
      <KeyLine>
        <KeyButtonOneHalf />
        <KeyButton />
        <KeyButton />
        <KeyButton />
        <KeyButtonSpace>space</KeyButtonSpace>
        <KeyButton />
        <KeyButton />
        <KeyButtonOneHalf />
        <KeyButton />
        <KeyButtonOneHalf />
      </KeyLine>
    </div >
  );
};