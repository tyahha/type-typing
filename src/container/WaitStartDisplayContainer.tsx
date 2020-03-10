import React from "react";
import { ImgFrame } from "../component/img-frame";
import titleImgSrc from "../assets/title.png";
import { WaitForStartStringDisplay } from "../component/string-display/StringDisplay";
import { KeyBoardContainer } from "./KeyBoardContainer";
import { Hands } from "../component/hands";
import { useTypingContext } from "../hooks/useTypingContext";

export const WaitStartDisplayContainer = () => {
  const { nextChar } = useTypingContext();
  return (
    <>
      <ImgFrame imgUrl={titleImgSrc} />
      <WaitForStartStringDisplay />
      <KeyBoardContainer nextChar={nextChar} />
      <Hands nextChar={nextChar} />
    </>
  );
};
