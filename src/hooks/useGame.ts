import { useState, useMemo, useEffect } from "react";
import { useProblems } from "./useProblems";
import { useMiss } from "./useMiss";
import { Mode } from "../model/Mode";
import { containKeyLines } from "../model/Keys";
import { hazureSound } from "../assets/hazureSound";
import { useMissObservable } from "./useMissObservable";
import { getAlphabets } from "../model/getAlphabets";

export const useGame = () => {
  const [mode, setMode] = useState(Mode.WaitStart);
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [endTime, setEndTime] = useState(new Date().getTime());
  const [allInputedCount, setAllInputedCount] = useState(0);

  const { problems, shuffleProblems } = useProblems();
  const [problemIndex, setProblemIndex] = useState(0);
  const problem = useMemo(() => problems[problemIndex], [
    problems,
    problemIndex
  ]);

  const keysCandidates = useMemo(() => getAlphabets(problem.kana), [problem]);
  const [inputedKeys, setInputedKeys] = useState("");
  const primaryKeys = useMemo(
    () => keysCandidates.filter(e => e.indexOf(inputedKeys) === 0)[0],
    [keysCandidates, inputedKeys]
  );

  const { misses, addMiss, resetMisses } = useMiss();
  const missObservable = useMissObservable();

  const nextChar = useMemo(() => {
    switch (mode) {
      case Mode.WaitStart:
        return "space";
      case Mode.Typing:
        return primaryKeys[inputedKeys.length];
      default:
        return "";
    }
  }, [mode, inputedKeys, primaryKeys]);

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
      } else if (mode === Mode.Result) {
        const inputKey = e.key.toUpperCase();
        if (inputKey === "R") {
          setCount(3);
          setInputedKeys("");
          setProblemIndex(0);
          setAllInputedCount(0);
          setMode(Mode.WaitStart);
        }
      } else if (mode === Mode.Typing) {
        const inputKey = e.key.toUpperCase();
        if (containKeyLines(inputKey)) {
          const newInputedKeys = inputedKeys + inputKey;
          const newKeysCandidate = keysCandidates.filter(
            e => e.indexOf(newInputedKeys) === 0
          );
          if (newKeysCandidate.length <= 0) {
            hazureSound.pause();
            hazureSound.currentTime = 0;
            hazureSound.play();
            addMiss(nextChar);
            missObservable.publishMiss();
          } else {
            setAllInputedCount(allInputedCount + 1);
            if (newInputedKeys !== newKeysCandidate[0]) {
              setInputedKeys(newInputedKeys);
            } else {
              const nextProblemIndex = problemIndex + 1;
              if (nextProblemIndex < problems.length) {
                setInputedKeys("");
                setProblemIndex(nextProblemIndex);
              } else {
                setEndTime(new Date().getTime());
                setMode(Mode.Result);
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
    inputedKeys,
    problemIndex,
    problems.length,
    shuffleProblems,
    addMiss,
    resetMisses,
    keysCandidates,
    missObservable,
    allInputedCount
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
    inputedKeysOfCurrentProblem: inputedKeys,
    problemIndex,
    keysCandidate: primaryKeys,
    allInputedCount,
    ...missObservable
  };
};
