import React from "react";
import styled from "@emotion/styled";
import { css } from "emotion";

import { formatTime } from "../../model/time";
import { diffTime } from "../../model/time";
import { useTypingContext } from "../../hooks/useTypingContext";

export const ResultModeView = () => {
  const { problems, startTime, endTime, misses } = useTypingContext();

  const missStrings = [...misses]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([s, num]) => `${s}(${num}回)`);

  const allInputKeyCount = problems.reduce(
    (acc, c) => acc + c.alphabet.length,
    0
  );

  const allMissTypeCount = Array.from(misses.values()).reduce(
    (acc, c) => acc + c,
    0
  );

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
      `}
    >
      <div
        className={css`
          margin: 5px;
          height: calc(100% - 20px);
          padding: 0;
          border-color: rgb(55, 55, 65);
          border-style: solid;
          border-width: 1px;
          background-color: #c1bdeb;
        `}
      >
        <ResultItemList
          items={[
            ["入力時間", formatTime(diffTime(startTime, endTime))],
            ["入力キー数", `${allInputKeyCount}回`],
            ["総ミスタイプ数", `${allMissTypeCount}回`],
            [
              "WPM",
              `${Math.floor(
                (allInputKeyCount / (endTime - startTime)) * (1000 * 60)
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
        <p
          className={css`
            margin: auto;
            text-align: center;
          `}
        >
          (Rキーでもう一回)
        </p>
      </div>
    </div>
  );
};

const ResultItemList = (props: { items: [string, string][] }) => (
  <ul
    className={css`
      width: 60%;
      margin: 0 auto;
      padding: 0;
    `}
  >
    {props.items.map((item, index) => (
      <ResultItem key={index} name={item[0]} value={item[1]} />
    ))}
  </ul>
);

const ResultItem = (props: { name: string; value: string }) => (
  <li
    className={css`
      list-style: none;
      border-width: 1px;
      border-bottom: solid;
    `}
  >
    <ResultItemData>{props.name}</ResultItemData>
    <ResultItemData
      className={css`
        text-align: center;
        width: 15em;
        font-weight: bold;
      `}
    >
      {props.value}
    </ResultItemData>
  </li>
);

const ResultItemData = styled.div`
  margin: 10px 0 0 10px;
  display: inline-block;
  width: 10em;
`;
