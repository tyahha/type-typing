import React from "react";
import { KeyButton } from "../component/key-button";

export const KeyContainer = (props: {
  char?: string;
  nextInputChar: string;
}) => {
  return props.char == null ? (
    <KeyButton />
  ) : (
      <KeyButton highLight={props.char === props.nextInputChar}>{props.char}</KeyButton>
    );
};
