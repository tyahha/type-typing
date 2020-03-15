import React from "react";
import { css } from "emotion";

export const ImgFrame = ({ imgUrl }: { imgUrl: string }) => (
  <div
    className={css`
      width: 100%;
      flex-grow: 1;
      overflow: hidden;
      position: relative;
      img {
        left: 50%;
        max-height: 100%;
        max-width: 100%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    `}
  >
    <img src={imgUrl} alt="" />
  </div>
);
