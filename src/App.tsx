import React from "react";
import style from "./App.module.scss";
import { KeyBoardContainer } from "./container/KeyBoardContainer";
import { Hands } from "./component/hands";
import { StringDisplay } from "./component/string-display";
import { ImgFrame } from "./component/img-frame";
import { Mode } from "./model/Mode";
import titleImgSrc from "./assets/title.png";
import countDown1ImgSrc from "./assets/count-down-1.jpeg";
import countDown2ImgSrc from "./assets/count-down-2.jpeg";
import countDown3ImgSrc from "./assets/count-down-3.jpeg";
import {
  WaitForStartStringDisplay,
  CountDownStringDisplay
} from "./component/string-display/StringDisplay";
import { ResultDisplay } from "./component/result-display/resultDisplay";
import { useGame } from "./hooks/useGame";

const App: React.FC = () => {
  const {
    mode,
    problems,
    startTime,
    endTime,
    misses,
    countDownCount,
    currentProbrem,
    nextChar,
    inputedCountOfCurrentProblem,
    problemIndex
  } = useGame();

  return (
    <main className={style.main}>
      <div className={style.app}>
        {mode === Mode.End ? (
          <ResultDisplay
            problems={problems}
            startTime={startTime}
            endTime={endTime}
            missedKeyAndNumbers={misses}
          />
        ) : (
          <>
            <ImgFrame
              imgUrl={
                mode === Mode.WaitStart
                  ? titleImgSrc
                  : mode === Mode.CountDown && countDownCount === 3
                  ? countDown3ImgSrc
                  : mode === Mode.CountDown && countDownCount === 2
                  ? countDown2ImgSrc
                  : mode === Mode.CountDown && countDownCount === 1
                  ? countDown1ImgSrc
                  : currentProbrem.img
              }
            />
            {mode === Mode.WaitStart ? (
              <WaitForStartStringDisplay />
            ) : mode === Mode.CountDown ? (
              <CountDownStringDisplay count={countDownCount} />
            ) : (
              <StringDisplay
                inputedCountOfCurrentProblem={inputedCountOfCurrentProblem}
                problems={problems}
                problemIndex={problemIndex}
              />
            )}
            <KeyBoardContainer nextChar={nextChar} />
            <div className={style.handsAjust}>
              <Hands nextChar={nextChar} />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default App;
