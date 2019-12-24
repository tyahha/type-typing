import React from "react";
import { KeyButton } from "../component/key-button";

export const KeyContainer = (props: { char?: string }) => {
  return props.char == null ? (
    <KeyButton />
  ) : (
    <KeyButton>{props.char}</KeyButton>
  );
};
