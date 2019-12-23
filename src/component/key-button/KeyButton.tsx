import React from "react";
import classNames from "classnames";

import style from "./style.module.scss";

export const KeyButton: React.FC<{ className?: string }> = props => {
  return (
    <div className={classNames(style.keyButton, props.className)}>
      {props.children}
    </div>
  );
};

export const KeyButtonOneHalf: React.FC = props => {
  return (
    <KeyButton className={style.keyButtonOneHalf}>{props.children}</KeyButton>
  );
};

export const KeyButtonDouble: React.FC = props => {
  return (
    <KeyButton className={style.keyButtonDouble}>{props.children}</KeyButton>
  );
};

export const KeyButtonDoubleHalf: React.FC = props => {
  return (
    <KeyButton className={style.keyButtonDoubleHalf}>
      {props.children}
    </KeyButton>
  );
};

export const KeyButtonSpace: React.FC = props => {
  return (
    <KeyButton className={style.keyButtonSpace}>{props.children}</KeyButton>
  );
};
