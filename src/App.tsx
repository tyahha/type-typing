import React, { useState, useEffect, useMemo } from "react";
import style from "./App.module.scss";
import {
  KeyBoardContainer,
  containKeyLines
} from "./container/KeyBoardContainer";
import { Hands } from "./component/hands";
import { StringDisplay } from "./component/string-display";
import { ImgFrame } from "./component/img-frame";
import { hazureSound } from "./assets/hazureSound";
import { Mode } from "./model/Mode";
import titleImgSrc from "./assets/title.png";
import countDown1ImgSrc from "./assets/count-down-1.jpeg";
import countDown2ImgSrc from "./assets/count-down-2.jpeg";
import countDown3ImgSrc from "./assets/count-down-3.jpeg";
import {
  WaitForStartStringDisplay,
  CountDownStringDisplay,
  ResultDisplay
} from "./component/string-display/StringDisplay";
import { useProblems } from "./hooks/useProblems";

const App: React.FC = () => {
  const [mode, setMode] = useState(Mode.WaitStart);
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [endTime, setEndTime] = useState(new Date().getTime());

  const { problems, shuffleProblems } = useProblems();
  const [problemIndex, setProblemIndex] = useState(0);
  const problem = useMemo(() => problems[problemIndex], [
    problems,
    problemIndex
  ]);

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
    shuffleProblems
  ]);

  return (
    <main className={style.main}>
      <div className={style.app}>
        <ImgFrame
          imgUrl={
            mode === Mode.WaitStart || mode === Mode.End
              ? titleImgSrc
              : mode === Mode.CountDown && count === 3
              ? countDown3ImgSrc
              : mode === Mode.CountDown && count === 2
              ? countDown2ImgSrc
              : mode === Mode.CountDown && count === 1
              ? countDown1ImgSrc
              : problem.img
          }
        />
        {mode === Mode.WaitStart ? (
          <WaitForStartStringDisplay />
        ) : mode === Mode.CountDown ? (
          <CountDownStringDisplay count={count} />
        ) : mode === Mode.End ? (
          <ResultDisplay startTime={startTime} endTime={endTime} />
        ) : (
          <StringDisplay
            inputedCount={inputedCount}
            problems={problems}
            problemIndex={problemIndex}
          />
        )}
        <KeyBoardContainer nextChar={nextChar} />
        <div className={style.handsAjust}>
          <Hands nextChar={nextChar} />
        </div>
      </div>
    </main>
  );
};

export default App;
