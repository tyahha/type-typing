import React from "react";
import classNames from "classnames";
import style from "./string-display.module.scss";
import { Problem } from "../../model/problem";
import { diffTime } from "../../logic/diffTime";
import { formatTime } from "../../logic/formatTime";

export const StringDisplay = (props: {
  inputedCount: number;
  problems: Problem[];
  problemIndex: number;
}) => {
  const problem = props.problems[props.problemIndex];
  const barWidth = `${100 -
    (100 * props.problemIndex) / props.problems.length}%`;
  return (
    <div className={style.stringDisplayFrame}>
      <div className={style.stringDisplay}>
        <p className={style.mainString}>{problem.main}</p>
        <p className={style.hiragana}>{problem.kana}</p>
        <p className={style.alphabet}>
          {problem.alphabet.split("").map((c, i) => (
            <Alphabet key={i} char={c} inputed={i < props.inputedCount} />
          ))}
        </p>
        <div className={style.remainProblemsBar} style={{ width: barWidth }} />
      </div>
    </div>
  );
};

const Alphabet = (props: { char: string; inputed: boolean }) => (
  <span className={classNames({ [style.inputed]: props.inputed })}>
    {props.char}
  </span>
);

export const WaitForStartStringDisplay = () => (
  <div className={classNames(style.stringDisplayFrame, style.waitForStart)}>
    <div className={style.stringDisplay}>
      <p className={style.mainString}>スペースキーで開始</p>
    </div>
  </div>
);

export const ResultDisplay = (props: {
  startTime: number;
  endTime: number;
  misses: Map<string, number>;
}) => {
  const misses = [...props.misses];
  const sortedMisses = misses.sort((a, b) => b[1] - a[1]);

  return (
    <div className={classNames(style.stringDisplayFrame, style.result)}>
      <div className={style.stringDisplay}>
        <p className={style.mainString}>
          {formatTime(diffTime(props.startTime, props.endTime))}
        </p>
        <p className={style.mainString}>(Rキーでもう一回)</p>
        {sortedMisses.length <= 0 ? (
          <></>
        ) : (
          <p
            className={style.mainString}
          >{`一番間違えた文字：${sortedMisses[0][0]}(${sortedMisses[0][1]}回)`}</p>
        )}
      </div>
    </div>
  );
};

export const CountDownStringDisplay = (props: { count: number }) => (
  <div className={classNames(style.stringDisplayFrame, style.countDown)}>
    <div className={style.stringDisplay}>
      <p className={style.mainString}>{props.count}</p>
    </div>
  </div>
);
