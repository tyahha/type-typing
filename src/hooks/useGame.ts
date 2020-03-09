import { useState, useMemo, useEffect } from "react";
import { useProblems } from "./useProblems";
import { useMiss } from "./useMiss";
import { Mode } from "../model/Mode";
import { containKeyLines } from "../container/KeyBoardContainer";
import { hazureSound } from "../assets/hazureSound";

export const useGame = () => {
  const [mode, setMode] = useState(Mode.WaitStart);
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [endTime, setEndTime] = useState(new Date().getTime());

  const { problems, shuffleProblems } = useProblems();
  const [problemIndex, setProblemIndex] = useState(0);
  const problem = useMemo(() => problems[problemIndex], [
    problems,
    problemIndex
  ]);
  const { misses, addMiss, resetMisses } = useMiss();

  const [inputedCount, setInputedCount] = useState(0);
  const nextChar = useMemo(() => {
    switch (mode) {
      case Mode.WaitStart:
        return "space";
      case Mode.Typing:
        return problem.alphabet[inputedCount];
      default:
        return "";
    }
  }, [mode, problem, inputedCount]);

  const [count, setCount] = useState(3);
  useEffect(() => {
    if (mode === Mode.CountDown) {
      setTimeout(() => {
        const nextCount = count - 1;
        if (nextCount === 0) {
          setMode(Mode.Typing);
          setStartTime(new Date().getTime());
        }
        setCount(nextCount);
      }, 1000);
    }
  }, [mode, count]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      console.log("on keyborad event", e);

      if (mode === Mode.WaitStart) {
        if (e.key === " ") {
          shuffleProblems();
          resetMisses();
          setMode(Mode.CountDown);
        }
      } else if (mode === Mode.End) {
        const inputKey = e.key.toUpperCase();
        if (inputKey === "R") {
          setCount(3);
          setInputedCount(0);
          setProblemIndex(0);
          setMode(Mode.WaitStart);
        }
      } else if (mode === Mode.Typing) {
        const inputKey = e.key.toUpperCase();
        if (containKeyLines(inputKey)) {
          if (inputKey !== nextChar) {
            hazureSound.pause();
            hazureSound.currentTime = 0;
            hazureSound.play();
            addMiss(nextChar);
          } else {
            const nextInputedCount = inputedCount + 1;
            if (nextInputedCount < problem.alphabet.length) {
              setInputedCount(inputedCount + 1);
            } else {
              const nextProblemIndex = problemIndex + 1;
              if (nextProblemIndex < problems.length) {
                setInputedCount(0);
                setProblemIndex(nextProblemIndex);
              } else {
                setEndTime(new Date().getTime());
                setMode(Mode.End);
              }
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [
    mode,
    nextChar,
    inputedCount,
    problem.alphabet.length,
    problemIndex,
    problems.length,
    shuffleProblems,
    addMiss,
    resetMisses
  ]);

  return {
    mode,
    setMode,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    problems,
    misses,
    addMiss,
    countDownCount: count,
    nextChar,
    inputedCountOfCurrentProblem: inputedCount,
    problemIndex
  };
};
