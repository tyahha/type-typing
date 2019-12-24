import React from "react";
import classNames from "classnames";

import style from "./hands.module.scss";

export const Hands = () => {
  return (
    <div className={style.hands}>
      <div className={classNames(style.hand, style.left)}>
        <div className={classNames(style.finger, style.little)} />
        <div className={style.finger} />
        <div className={style.finger} />
        <div className={style.finger} />
        <div className={classNames(style.finger, style.thumb)} />
      </div>
      <div className={classNames(style.hand, style.right)}>
        <div className={classNames(style.finger, style.thumb)} />
        <div className={style.finger} />
        <div className={style.finger} />
        <div className={style.finger} />
        <div className={classNames(style.finger, style.little)} />
      </div>
    </div>
  );
};
