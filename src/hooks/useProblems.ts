import { Problem } from "../model/problem";
import { useState, useCallback } from "react";
import { shuffleArray } from "../util/shuffleArray";
import { problems } from "../assets/problems";

export const useProblems = (): {
  problems: Problem[];
  shuffleProblems: () => void;
} => {
  const [shuffledProblems, setShuffledProblems] = useState(
    shuffleArray(problems)
  );

  const shuffleProblems = useCallback(
    () => setShuffledProblems(shuffleArray(problems)),
    [setShuffledProblems]
  );

  return {
    problems: shuffledProblems,
    shuffleProblems
  };
};
