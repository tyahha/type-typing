import React from "react";
import classNames from "classnames";

import style from "./hands.module.scss";

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
    <div className={style.hands}>
      <div className={classNames(style.hand, style.left)}>
        <div
          className={classNames(style.finger, style.little, {
            [style.highLight]: leftLittleFingerKeys.includes(nextChar)
          })}
        />
        <div
          className={classNames(style.finger, {
            [style.highLight]: leftRingFingerKeys.includes(nextChar)
          })}
        />
        <div
          className={classNames(style.finger, {
            [style.highLight]: leftMiddleFingerKeys.includes(nextChar)
          })}
        />
        <div
          className={classNames(style.finger, {
            [style.highLight]: leftIndexFingerKeys.includes(nextChar)
          })}
        />
        <div className={classNames(style.finger, style.thumb)} />
      </div>
      <div className={classNames(style.hand, style.right)}>
        <div className={classNames(style.finger, style.thumb)} />
        <div
          className={classNames(style.finger, {
            [style.highLight]: rightIndexFingerKeys.includes(nextChar)
          })}
        />
        <div
          className={classNames(style.finger, {
            [style.highLight]: rightMiddleFingerKeys.includes(nextChar)
          })}
        />
        <div
          className={classNames(style.finger, {
            [style.highLight]: rightRingFingerKeys.includes(nextChar)
          })}
        />
        <div
          className={classNames(style.finger, style.little, {
            [style.highLight]: rightLittleFingerKeys.includes(nextChar)
          })}
        />
      </div>
    </div>
  );
};
