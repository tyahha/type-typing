import React from "react";
import style from "./App.module.scss";
import {
  KeyButton,
  KeyButtonOneHalf,
  KeyButtonDouble,
  KeyButtonDoubleHalf,
  KeyButtonSpace
} from "./component/key-button/KeyButton";

const App: React.FC = () => {
  return (
    <main className={style.main}>
      <div className={style.app}>
        <div className={style.keyLineContainer}>
          <div className={style.keyContainer1}>
            <KeyButton />
            <KeyButton>1</KeyButton>
            <KeyButton>2</KeyButton>
            <KeyButton>3</KeyButton>
            <KeyButton>4</KeyButton>
            <KeyButton>5</KeyButton>
            <KeyButton>6</KeyButton>
            <KeyButton>7</KeyButton>
            <KeyButton>8</KeyButton>
            <KeyButton>9</KeyButton>
            <KeyButton>0</KeyButton>
            <KeyButton>-</KeyButton>
            <KeyButton />
            <KeyButton />
            <KeyButton />
          </div>
          <div className={style.keyContainer1}>
            <KeyButtonOneHalf />
            <KeyButton>Q</KeyButton>
            <KeyButton>W</KeyButton>
            <KeyButton>E</KeyButton>
            <KeyButton>R</KeyButton>
            <KeyButton>T</KeyButton>
            <KeyButton>Y</KeyButton>
            <KeyButton>U</KeyButton>
            <KeyButton>I</KeyButton>
            <KeyButton>O</KeyButton>
            <KeyButton>P</KeyButton>
            <KeyButton>@</KeyButton>
            <KeyButton />
            <KeyButtonOneHalf />
          </div>
          <div className={style.keyContainer1}>
            <KeyButtonDouble />
            <KeyButton>A</KeyButton>
            <KeyButton>S</KeyButton>
            <KeyButton>D</KeyButton>
            <KeyButton>F</KeyButton>
            <KeyButton>G</KeyButton>
            <KeyButton>H</KeyButton>
            <KeyButton>J</KeyButton>
            <KeyButton>K</KeyButton>
            <KeyButton>L</KeyButton>
            <KeyButton>;</KeyButton>
            <KeyButton>:</KeyButton>
            <KeyButton />
            <KeyButton />
          </div>
          <div className={style.keyContainer1}>
            <KeyButtonDoubleHalf />
            <KeyButton>Z</KeyButton>
            <KeyButton>X</KeyButton>
            <KeyButton>C</KeyButton>
            <KeyButton>V</KeyButton>
            <KeyButton>B</KeyButton>
            <KeyButton>N</KeyButton>
            <KeyButton>M</KeyButton>
            <KeyButton>,</KeyButton>
            <KeyButton>.</KeyButton>
            <KeyButton>/</KeyButton>
            <KeyButton>\</KeyButton>
            <KeyButtonOneHalf />
          </div>
          <div className={style.keyContainer1}>
            <KeyButtonOneHalf />
            <KeyButton />
            <KeyButton />
            <KeyButton />
            <KeyButtonSpace>space</KeyButtonSpace>
            <KeyButton />
            <KeyButton />
            <KeyButtonOneHalf />
            <KeyButton />
            <KeyButtonOneHalf />
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
