import { useState, useMemo, useEffect } from "react";
import { Mode } from "../model/Mode";
import { containKeyLines } from "../model/Keys";
import { hazureSound } from "../assets/hazureSound";
import { useMissObservable } from "./useMissObservable";
import { getJaUnitCandidates } from "../model/getJaUnitCandidates";
import { getKeys } from "../model/getKeys";
import { Problem } from "../model/problem";
import { problems } from "../assets/problems";
import { shuffleArray } from "../util/shuffleArray";

export interface InputedKana {
  kana: string;
  key: string;
}

interface TypingState {
  mode: Mode;
  startTime: number;
  endTime: number;
  problems: Problem[];
  problemIndex: number;
  completeProblemInputs: string[];
  misses: Map<string, number>;
  inputedKanas: InputedKana[];
  inputedKeys: string;
  countDownCount: number;
}

const getInitialTypingState = (): TypingState => ({
  mode: Mode.WaitStart,
  startTime: 0,
  endTime: 0,
  problems: shuffleArray(problems),
  problemIndex: 0,
  completeProblemInputs: [],
  misses: new Map(),
  inputedKanas: [],
  inputedKeys: "",
  countDownCount: 3
});

export const useGame = () => {
  const [typingState, setTypingState] = useState(getInitialTypingState());
  const {
    mode,
    startTime,
    endTime,
    problems,
    problemIndex,
    completeProblemInputs,
    misses,
    inputedKanas,
    inputedKeys,
    countDownCount
  } = typingState;
  const problem = useMemo(() => problems[problemIndex], [
    problems,
    problemIndex
  ]);
  const missObservable = useMissObservable();

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

  useEffect(() => {
    if (mode === Mode.CountDown) {
      setTimeout(() => {
        const nextCount = countDownCount - 1;
        if (nextCount === 0) {
          setTypingState({
            ...typingState,
            mode: Mode.Typing,
            startTime: new Date().getTime()
          });
        } else {
          setTypingState({ ...typingState, countDownCount: nextCount });
        }
      }, 1000);
    }
  }, [mode, countDownCount, setTypingState, typingState]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      console.log("on keyborad event", e);

      if (mode === Mode.WaitStart) {
        if (e.key === " ") {
          setTypingState({ ...typingState, mode: Mode.CountDown });
        }
      } else if (mode === Mode.Result) {
        const inputKey = e.key.toUpperCase();
        if (inputKey === "R") {
          setTypingState(getInitialTypingState);
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
            if (
              remainKanas.length > 1 &&
              remainKanas[0] === "ん" &&
              inputedKeys === "N" &&
              !"あいうえおなにぬねのん".includes(remainKanas[1]) &&
              getJaUnitCandidates(remainKanas[1], "").some(c =>
                c.keys.some(k => k.startsWith(inputKey))
              )
            ) {
              // NNの後ろのNを省略できるパターン
              setTypingState({
                ...typingState,
                inputedKeys: inputKey,
                inputedKanas: [
                  ...inputedKanas,
                  {
                    kana: "ん",
                    key: "N"
                  }
                ]
              });
            } else {
              hazureSound.pause();
              hazureSound.currentTime = 0;
              hazureSound.play();
              const count = misses.get(nextChar) ?? 0;
              setTypingState({
                ...typingState,
                misses: new Map([...typingState.misses, [nextChar, count + 1]])
              });
              missObservable.publishMiss();
            }
          } else {
            const completeJaUnit = nextJaUnitCandidates.find(j =>
              j.keys.some(k => k === nextInputedKeys)
            );
            if (completeJaUnit == null) {
              setTypingState({ ...typingState, inputedKeys: nextInputedKeys });
            } else {
              const nextInputedKanas = [
                ...inputedKanas,
                {
                  kana: completeJaUnit.kana,
                  key: nextInputedKeys
                }
              ];

              const nextState: Partial<TypingState> = {
                inputedKeys: ""
              };

              const allKanaString = nextInputedKanas.reduce(
                (acc, c) => acc + c.kana,
                ""
              );

              if (problem.kana !== allKanaString) {
                nextState.inputedKanas = nextInputedKanas;
              } else {
                nextState.completeProblemInputs = [
                  ...completeProblemInputs,
                  nextInputedKanas.reduce((acc, c) => acc + c.key, "")
                ];
                nextState.inputedKanas = [];
                const nextProblemIndex = problemIndex + 1;
                if (nextProblemIndex < problems.length) {
                  nextState.problemIndex = nextProblemIndex;
                } else {
                  nextState.endTime = new Date().getTime();
                  nextState.mode = Mode.Result;
                }
              }

              setTypingState({ ...typingState, ...nextState });
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
    typingState,
    misses,
    mode,
    nextChar,
    inputedKanas,
    inputedKeys,
    problemIndex,
    problems.length,
    setTypingState,
    missObservable,
    nextJaUnitCandidates,
    problem,
    completeProblemInputs,
    remainKanas,
    remainKeys
  ]);

  return {
    mode,
    startTime,
    endTime,
    problems,
    misses,
    countDownCount,
    nextChar,
    inputedKeys,
    inputedKanas,
    remainKeys,
    problemIndex,
    completeProblemInputs,
    ...missObservable
  };
};
