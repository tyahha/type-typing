import React from "react";
import style from "./App.module.scss";
import { KeyBoardContainer } from "./container/KeyBoardContainer";
import { Hands } from "./component/hands";
import { StringDisplay } from "./component/string-display";

const App: React.FC = () => {
  return (
    <main className={style.main}>
      <div className={style.app}>
        <StringDisplay />
        <KeyBoardContainer />
        <div className={style.handsAjust}>
          <Hands />
        </div>
      </div>
    </main>
  );
};

export default App;
