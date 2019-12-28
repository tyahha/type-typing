import React, { useState, useEffect, useMemo } from "react";
import style from "./App.module.scss";
import { KeyBoardContainer } from "./container/KeyBoardContainer";
import { Hands } from "./component/hands";
import { StringDisplay } from "./component/string-display";
import { ImgFrame } from "./component/img-frame";

const problems = [
  {
    img: "https://www.shonenjump.com/j/rensai/img/main_kimetsu.jpg",
    main: "鬼滅の刃",
    kana: "きめつのやいば",
    alphabet: "KIMETUNOYAIBA"
  },
  {
    img: "https://item-shopping.c.yimg.jp/i/n/ten-ten-store_kmt-mctl-2",
    main: "竈門禰豆子",
    kana: "かまどねずこ",
    alphabet: "KAMADONEZUKO"
  },
  {
    img: "https://i.ytimg.com/vi/j5zpWCBbhD0/maxresdefault.jpg",
    main: "煉獄杏寿郎",
    kana: "れんごくきょうじゅろう",
    alphabet: "RENGOKUKYOUJUROU"
  },
  {
    img:
      "https://shop6-makeshop.akamaized.net/shopimages/thechara55/0000000168982_Gg0cV7g.jpg",
    main: "竈門炭治郎",
    kana: "かまどたんじろう",
    alphabet: "KAMADOTANJIROU"
  },
  {
    img: "https://livedoor.blogimg.jp/anigei-mangabox/imgs/4/4/444766d1.png",
    main: "心を燃やせ",
    kana: "こころをもやせ",
    alphabet: "KOKOROWOMOYASE"
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
