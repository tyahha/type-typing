import { useState, useMemo, useEffect } from "react";
import { useProblems } from "./useProblems";
import { useMiss } from "./useMiss";
import { Mode } from "../model/Mode";
import { containKeyLines } from "../model/Keys";
import { hazureSound } from "../assets/hazureSound";
import { useMissObservable } from "./useMissObservable";
import { getJaUnitCandidates } from "../model/getJaUnitCandidates";
import { getKeys } from "../model/getKeys";

export interface InputedKana {
  kana: string;
  key: string;
}

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
  const [completeProblemInputs, setCompleteProblemInputs] = useState<string[]>(
    []
  );
  const { misses, addMiss, resetMisses } = useMiss();
  const missObservable = useMissObservable();

  const [inputedKanas, setInputedKanas] = useState<InputedKana[]>([]);
  const [inputedKeys, setInputedKeys] = useState("");

  const remainKanas = useMemo(() => {
    const allInputedKanaLength = inputedKanas.reduce(
      (acc, c) => acc + c.kana.length,
      0
    );
    return problem.kana.slice(allInputedKanaLength);
  }, [problem, inputedKanas]);

  const [nextJaUnitCandidates, remainKeys] = useMemo(
    () => [
      getJaUnitCandidates(remainKanas, inputedKeys),
      getKeys(remainKanas, inputedKeys)
    ],
    [remainKanas, inputedKeys]
  );

  const nextChar = useMemo(() => {
    switch (mode) {
      case Mode.WaitStart:
        return "space";
      case Mode.Typing:
        return nextJaUnitCandidates[0].keys.filter(k =>
          k.startsWith(inputedKeys)
        )[0][inputedKeys.length];
      default:
        return "";
    }
  }, [mode, nextJaUnitCandidates, inputedKeys]);

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
          setCompleteProblemInputs([]);
          setMode(Mode.CountDown);
        }
      } else if (mode === Mode.Result) {
        const inputKey = e.key.toUpperCase();
        if (inputKey === "R") {
          setCount(3);
          setInputedKanas([]);
          setInputedKeys("");
          setProblemIndex(0);
          setMode(Mode.WaitStart);
        }
      } else if (mode === Mode.Typing) {
        const inputKey = e.key.toUpperCase();
        if (containKeyLines(inputKey)) {
          const nextInputedKeys = inputedKeys + inputKey;
          if (
            !nextJaUnitCandidates.some(j =>
              j.keys.some(k => k.startsWith(nextInputedKeys))
            )
          ) {
            hazureSound.pause();
            hazureSound.currentTime = 0;
            hazureSound.play();
            addMiss(nextChar);
            missObservable.publishMiss();
          } else {
            const completeJaUnit = nextJaUnitCandidates.find(j =>
              j.keys.some(k => k === nextInputedKeys)
            );
            if (completeJaUnit == null) {
              setInputedKeys(nextInputedKeys);
            } else {
              const nextInputedKanas = [
                ...inputedKanas,
                {
                  kana: completeJaUnit.kana,
                  key: nextInputedKeys
                }
              ];
              setInputedKeys("");

              const allKanaString = nextInputedKanas.reduce(
                (acc, c) => acc + c.kana,
                ""
              );

              if (problem.kana !== allKanaString) {
                setInputedKanas(nextInputedKanas);
              } else {
                setCompleteProblemInputs([
                  ...completeProblemInputs,
                  nextInputedKanas.reduce((acc, c) => acc + c.key, "")
                ]);
                setInputedKanas([]);
                const nextProblemIndex = problemIndex + 1;
                if (nextProblemIndex < problems.length) {
                  setProblemIndex(nextProblemIndex);
                } else {
                  setEndTime(new Date().getTime());
                  setMode(Mode.Result);
                }
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
    inputedKanas,
    inputedKeys,
    problemIndex,
    problems.length,
    shuffleProblems,
    addMiss,
    resetMisses,
    missObservable,
    nextJaUnitCandidates,
    problem,
    completeProblemInputs
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
    inputedKeys,
    inputedKanas,
    remainKeys,
    problemIndex,
    completeProblemInputs,
    ...missObservable
  };
};
