import React from "react";
import { ImgFrame } from "./view-part/ImgFrame";
import titleImgSrc from "../../assets/title.png";
import { WaitForStartStringDisplay } from "./view-part/string-display/WaitForStartStringDisplay";
import { KeyBoard } from "./view-part/KeyBoard";
import { Hands } from "./view-part/Hands";
import { useTypingContext } from "../../hooks/useTypingContext";

export const WaitStartModeView = () => {
  const { nextChar } = useTypingContext();
  return (
    <>
      <ImgFrame imgUrl={titleImgSrc} />
      <WaitForStartStringDisplay />
      <KeyBoard nextChar={nextChar} />
      <Hands nextChar={nextChar} />
    </>
  );
};
