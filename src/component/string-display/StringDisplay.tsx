import React from "react";
import style from "./string-display.module.scss";

export const StringDisplay = () => {
  return (
    <div className={style.stringDisplayFrame}>
      <div className={style.stringDisplay}>
        <p className={style.mainString}>鬼滅の刃</p>
        <p className={style.hiragana}>きめつのやいば</p>
        <p className={style.alphabet}>KIMETUNOYAIBA</p>
      </div>
    </div>
  );
};
