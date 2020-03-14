import React from "react";
import { ImgFrame } from "../component/img-frame";
import countDown1ImgSrc from "../assets/count-down-1.jpeg";
import countDown2ImgSrc from "../assets/count-down-2.jpeg";
import countDown3ImgSrc from "../assets/count-down-3.jpeg";
import { KeyBoardContainer } from "./KeyBoardContainer";
import { Hands } from "../component/Hands";
import { CountDownStringDisplay } from "../component/string-display/StringDisplay";
import { useTypingContext } from "../hooks/useTypingContext";

export const CountDownDisplayContainer = () => {
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
      <KeyBoardContainer nextChar={""} />
      <Hands nextChar={""} />
    </>
  );
};
