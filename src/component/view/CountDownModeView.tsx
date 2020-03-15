import React from "react";
import { ImgFrame } from "./view-part/ImgFrame";
import countDown1ImgSrc from "../../assets/count-down-1.jpeg";
import countDown2ImgSrc from "../../assets/count-down-2.jpeg";
import countDown3ImgSrc from "../../assets/count-down-3.jpeg";
import { KeyBoard } from "./view-part/KeyBoard";
import { Hands } from "./view-part/Hands";
import { CountDownStringDisplay } from "./view-part/string-display/CountDownStringDisplay";
import { useTypingContext } from "../../hooks/useTypingContext";

export const CountDownModeView = () => {
  const { countDownCount } = useTypingContext();

  const imgUrl =
    countDownCount === 3
      ? countDown3ImgSrc
      : countDownCount === 2
      ? countDown2ImgSrc
      : countDownCount === 1
      ? countDown1ImgSrc
      : "";

  return (
    <>
      <ImgFrame imgUrl={imgUrl} />
      <CountDownStringDisplay count={countDownCount} />
      <KeyBoard nextChar={""} />
      <Hands nextChar={""} />
    </>
  );
};
