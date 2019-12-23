import React from 'react';
import style from './App.module.scss';
import { KeyButton } from './component/key-button/KeyButton';


const App: React.FC = () => {
  return (
    <main className={style.main}>
      <div className={style.app}>
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
      </div>
    </main>
  );
}

export default App;
