import React from "react";
import { KeyButton } from "../component/key-button";

export const KeyContainer = ({
  char,
  nextChar
}: {
  char?: string;
  nextChar: string;
}) => <KeyButton highLight={char === nextChar}>{char ?? ""}</KeyButton>;
