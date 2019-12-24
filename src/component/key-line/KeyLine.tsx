import style from "./KeyLine.module.scss";

import React from "react";

export const KeyLine: React.FC = props => (
  <div className={style.keyLine}>{props.children}</div>
);
