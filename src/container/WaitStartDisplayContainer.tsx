import React from "react";
import { ImgFrame } from "../component/img-frame";
import titleImgSrc from "../assets/title.png";
import { WaitForStartStringDisplay } from "../component/string-display/StringDisplay";
import { KeyBoardContainer } from "./KeyBoardContainer";
import { Hands } from "../component/hands";

export const WaitStartDisplayContainer = ({
  nextChar
}: {
  nextChar: string;
}) => (
  <>
    <ImgFrame imgUrl={titleImgSrc} />
    <WaitForStartStringDisplay />
    <KeyBoardContainer nextChar={nextChar} />
    <Hands nextChar={nextChar} />
  </>
);
