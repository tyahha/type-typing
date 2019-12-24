import React from "react";
import style from "./App.module.scss";
import { KeyBoardContainer } from "./container/KeyBoardContainer";

const App: React.FC = () => {
  return (
    <main className={style.main}>
      <div className={style.app}>
        <KeyBoardContainer />
      </div>
    </main>
  );
};

export default App;
