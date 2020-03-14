import React from "react";
import { css } from "emotion";
import styled from "@emotion/styled";

const leftLittleFingerKeys = ["1", "Q", "A", "Z"];
const leftRingFingerKeys = ["2", "W", "S", "X"];
const leftMiddleFingerKeys = ["3", "E", "D", "C"];
const leftIndexFingerKeys = ["4", "R", "F", "V", "5", "T", "G", "B"];
const rightIndexFingerKeys = ["6", "Y", "H", "N", "7", "U", "J", "M"];
const rightMiddleFingerKeys = ["8", "I", "K", ","];
const rightRingFingerKeys = ["9", "O", "L", "."];
const rightLittleFingerKeys = ["0", "P", ";", "/", "-", "@", ":", "\\"];

export const Hands = ({ nextChar }: { nextChar: string }) => {
  return (
    <div
      className={css`
        padding-top: 10px;
        display: flex;
        justify-content: space-around;
      `}
    >
      <Hand
        className={css`
          padding-left: 30px;
        `}
      >
        <Little highLight={leftLittleFingerKeys.includes(nextChar)} />
        <Finger highLight={leftRingFingerKeys.includes(nextChar)} />
        <Finger highLight={leftMiddleFingerKeys.includes(nextChar)} />
        <Finger highLight={leftIndexFingerKeys.includes(nextChar)} />
        <Thumb />
      </Hand>
      <Hand
        className={css`
          padding-right: 30px;
        `}
      >
        <Thumb />
        <Finger highLight={rightIndexFingerKeys.includes(nextChar)} />
        <Finger highLight={rightMiddleFingerKeys.includes(nextChar)} />
        <Finger highLight={rightRingFingerKeys.includes(nextChar)} />
        <Little highLight={rightLittleFingerKeys.includes(nextChar)} />
      </Hand>
    </div>
  );
};

const Hand = styled.div`
  display: flex;
  width: 320px;
  justify-content: space-between;
`;

const Finger = styled.div<{
  highLight?: boolean;
}>`
  border-radius: 30px 30px 0 0;
  background-color: ${props =>
    props.highLight ? "rgb(226, 96, 9)" : "rgb(110, 110, 110)"};
  width: 60px;
  height: 100px;
  margin: auto 0 0 0;
`;

const Thumb = styled(Finger)`
  height: 50px;
`;

const Little = styled(Finger)`
  height: 80px;
`;
