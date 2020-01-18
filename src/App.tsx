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
import { problems } from "./assets/problems";
import { Mode } from "./model/Mode";

const App: React.FC = () => {
  const [mode, setMode] = useState(Mode.WaitStart);

  const [problemIndex, setProblemIndex] = useState(0);
  const problem = useMemo(() => problems[problemIndex], [problemIndex]);

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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      console.log("on keyborad event", e);

      if (mode === Mode.WaitStart) {
        if (e.key === " ") {
          setMode(Mode.Typing);
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
  }, [mode, nextChar, inputedCount, problem.alphabet.length, problemIndex]);

  return (
    <main className={style.main}>
      <div className={style.app}>
        <ImgFrame imgUrl={problem.img} />
        <StringDisplay inputedCount={inputedCount} problem={problem} />
        <KeyBoardContainer nextChar={nextChar} />
        <div className={style.handsAjust}>
          <Hands nextChar={nextChar} />
        </div>
      </div>
    </main>
  );
};

export default App;
