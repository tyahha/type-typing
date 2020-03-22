import React from "react";
import styled from "@emotion/styled";
import { css } from "emotion";

import { createResult, ResultItem } from "../../model/result";
import { useTypingContext } from "../../hooks/useTypingContext";

export const ResultModeView = () => {
  const {
    problems,
    startTime,
    endTime,
    misses,
    allInputedCount
  } = useTypingContext();
  const resultItems = createResult(
    startTime,
    endTime,
    problems,
    misses,
    allInputedCount
  );

  return (
    <ResultFrame>
      <ResultContentArea>
        <CenterizeResult>
          <ResultItemList items={resultItems} />
          <CenterizedSimpleLabel>(Rキーでもう一回)</CenterizedSimpleLabel>
        </CenterizeResult>
      </ResultContentArea>
    </ResultFrame>
  );
};

const ResultFrame = styled.div`
  width: 100%;
  height: 100%;
`;

const ResultContentArea = styled.div`
  margin: 5px;
  height: calc(100% - 20px);
  padding: 0;
  border-color: rgb(55, 55, 65);
  border-style: solid;
  border-width: 1px;
  background-color: #c1bdeb;
`;

const CenterizeResult = styled.div`
  position: relative;
  top: 40%;
  transform: translateY(-50%);
`;

const ResultItemList = (props: { items: ResultItem[] }) => (
  <ul
    className={css`
      width: 60%;
      margin: 0 auto;
      padding: 0;
    `}
  >
    {props.items.map((item, index) => (
      <ResultItemView key={index} item={item} />
    ))}
  </ul>
);

const ResultItemView = (props: { item: ResultItem }) => (
  <li
    className={css`
      list-style: none;
      border-bottom: 1px solid #777;
      display: flex;
    `}
  >
    <ResultItemData>{props.item[0]}</ResultItemData>
    <ResultItemData
      className={css`
        text-align: center;
        font-weight: bold;
        flex-grow: 1;
      `}
    >
      {props.item[1]}
    </ResultItemData>
  </li>
);

const ResultItemData = styled.div`
  margin: 10px 0 0 10px;
  display: inline-block;
  width: 10em;
`;

const CenterizedSimpleLabel = styled.p`
  margin: auto;
  text-align: center;
`;
