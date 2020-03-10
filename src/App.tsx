import React from "react";
import style from "./App.module.scss";
import { TypingContextProvider } from "./TypingContextProvider";
import { ModeSwitcherContainer } from "./container/ModeSwicherContainer";

const App = () => {
  return (
    <TypingContextProvider>
      <main className={style.main}>
        <div className={style.app}>
          <ModeSwitcherContainer />
        </div>
      </main>
    </TypingContextProvider>
  );
};

export default App;
