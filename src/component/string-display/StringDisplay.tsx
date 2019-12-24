import React from "react";
import classNames from "classnames";
import style from "./string-display.module.scss";
import { Problem } from "../../model/problem";

export const StringDisplay = (props: {
  inputedCount: number;
  problem: Problem;
}) => {
  return (
    <div className={style.stringDisplayFrame}>
      <div className={style.stringDisplay}>
        <p className={style.mainString}>{props.problem.main}</p>
        <p className={style.hiragana}>{props.problem.kana}</p>
        <p className={style.alphabet}>
          {props.problem.alphabet.split("").map((c, i) => (
            <Alphabet key={i} char={c} inputed={i < props.inputedCount} />
          ))}
        </p>
      </div>
    </div>
  );
};

const Alphabet = (props: { char: string; inputed: boolean }) => (
  <span className={classNames({ [style.inputed]: props.inputed })}>
    {props.char}
  </span>
);
