import React from "react";
import style from "./style.module.scss";

export const KeyButton: React.FC = (props) => {
  return <div className={style.keyButton}>{props.children}</div>
};