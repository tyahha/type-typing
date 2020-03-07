import React from "react";
import classNames from "classnames";
import style from "./result-display.module.scss";
import { formatTime } from "../../logic/formatTime";
import { diffTime } from "../../logic/diffTime";
import { Problem } from "../../model/problem";

export const ResultDisplay = (props: {
  problems: Problem[];
  startTime: number;
  endTime: number;
  missedKeyAndNumbers: Map<string, number>;
}) => {
  const misses = [...props.missedKeyAndNumbers];
  const missStrings = misses
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([s, num]) => `${s}(${num}回)`);
  const allInputKeyCount = props.problems.reduce(
    (acc, c) => acc + c.alphabet.length,
    0
  );
  const allMissTypeCount = Array.from(
    props.missedKeyAndNumbers.values()
  ).reduce((acc, c) => acc + c, 0);

  return (
    <div className={classNames(style.resultDisplayFrame, style.result)}>
      <div className={style.resultDisplay}>
        <ResultItemList
          items={[
            ["入力時間", formatTime(diffTime(props.startTime, props.endTime))],
            ["入力キー数", `${allInputKeyCount}回`],
            ["総ミスタイプ数", `${allMissTypeCount}回`],
            [
              "WPM",
              `${Math.floor(
                (allInputKeyCount / (props.endTime - props.startTime)) *
                  (1000 * 60)
              )}`
            ],
            [
              "正誤率",
              `${Math.floor(
                (allInputKeyCount / (allInputKeyCount + allMissTypeCount)) * 100
              )}%`
            ],
            ["ミスしやすいキー", missStrings.join(", ")]
          ]}
        />
        <p className={style.retry}>(Rキーでもう一回)</p>
      </div>
    </div>
  );
};

const ResultItemList = (props: { items: [string, string][] }) => (
  <ul>
    {props.items.map((item, index) => (
      <ResultItem key={index} name={item[0]} value={item[1]} />
    ))}
  </ul>
);

const ResultItem = (props: { name: string; value: string }) => (
  <li>
    <div>{props.name}</div>
    <div className={style.data}>{props.value}</div>
  </li>
);
