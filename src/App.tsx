import React from "react";
import style from "./App.module.scss";
import { Mode } from "./model/Mode";
import { ResultDisplay } from "./component/result-display/resultDisplay";
import { useGame } from "./hooks/useGame";
import { WaitStartDisplayContainer } from "./container/WaitStartDisplayContainer";
import { TypingDisplayContainer } from "./container/TypingDisplayContainer";
import { CountDownDisplayContainer } from "./container/CountDownDisplayContainer";

const App = () => {
  const {
    mode,
    problems,
    startTime,
    endTime,
    misses,
    countDownCount,
    nextChar,
    inputedCountOfCurrentProblem,
    problemIndex
  } = useGame();

  return (
    <main className={style.main}>
      <div className={style.app}>
        {mode === Mode.WaitStart ? (
          <WaitStartDisplayContainer nextChar={nextChar} />
        ) : mode === Mode.CountDown ? (
          <CountDownDisplayContainer countDownCount={countDownCount} />
        ) : mode === Mode.Typing ? (
          <TypingDisplayContainer
            inputedCountOfCurrentProblem={inputedCountOfCurrentProblem}
            problems={problems}
            problemIndex={problemIndex}
          />
        ) : mode === Mode.End ? (
          <ResultDisplay
            problems={problems}
            startTime={startTime}
            endTime={endTime}
            missedKeyAndNumbers={misses}
          />
        ) : (
          <>Unknown Mode !!! [{mode}]</>
        )}
      </div>
    </main>
  );
};

export default App;
