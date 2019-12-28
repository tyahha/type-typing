import React from "react";

import style from "./img-frame.module.scss";

export const ImgFrame = ({ imgUrl }: { imgUrl: string }) => (
  <div className={style.imgFrame}>
    <img src={imgUrl} alt="" />
  </div>
);
