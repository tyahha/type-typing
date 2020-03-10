import { useContext } from "react";
import { TypingContext } from "../TypingContextProvider";

export const useTypingContext = () => useContext(TypingContext);
