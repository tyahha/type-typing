import React, { useState, useEffect, useMemo } from "react";
import style from "./App.module.scss";
import { KeyBoardContainer } from "./container/KeyBoardContainer";
import { Hands } from "./component/hands";
import { StringDisplay } from "./component/string-display";

const problems = [
  {
    main: "鬼滅の刃",
    kana: "きめつのやいば",
    alphabet: "KIMETUNOYAIBA"
  },
  {
    main: "竈門禰豆子",
    kana: "かまどねずこ",
    alphabet: "KAMADONEZUKO"
  }
];

const App: React.FC = () => {
  const [problemIndex, setProblemIndex] = useState(0);
  const problem = useMemo(() => problems[problemIndex], [problemIndex]);

  const [inputedCount, setInputedCount] = useState(0);
  const nextChar = useMemo(() => problem.alphabet[inputedCount], [
    problem,
    inputedCount
  ]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === nextChar.toLowerCase()) {
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
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [nextChar, inputedCount, problem.alphabet.length, problemIndex]);

  return (
    <main className={style.main}>
      <div className={style.app}>
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
