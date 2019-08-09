import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import GameControls from '../components/gamecontrols';
import GameStatus from '../components/gamestatus';
import GameBoard from '../components/gameboard';

import Minesweeper, { WIN, LOSS } from '../components/Minesweeper';

// TODO - fix this, useState
let startTime = 0
let setStartTime = val => startTime = val

const Index = () => {
  const [boardSize, setBoardSize] = useState(10);
  const [minesweeper, setMinesweeper] = useState(new Minesweeper(boardSize));
  const [board, setBoard] = useState([]);
  const [mineCount, setMineCount] = useState(0);
  const [message, setMessage] = useState('Loading');
  const [isCheater, setIsCheater] = useState(false);
  const [explodedAt, setExplodedAt] = useState(null);
  const [duration, setDuration] = useState(0);
  // const [startTime, setStartTime] = useState(0);

  // NOTE - this seems to be the right way to do something on mount
  useEffect(() => {
    newGame();
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      // if no start time is set, then no game is in progress
      if (startTime) {
        setDuration(Date.now() - startTime);
      }
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  const newGame = () => {
    const m = new Minesweeper(boardSize);
    setMinesweeper(m);
    setBoard([...m.board]);
    setMineCount(m.mines.length);
    setMessage("Let's do it" + Math.random());
    setExplodedAt(null);
    setStartTime(Date.now());
  };

  const handleNewGameClick = () => newGame();
  const handleWin = () => {
    setDuration(Date.now() - startTime);
    setStartTime(0);
    setMessage("You've done it.");
  };
  const handleLoss = () => {
    setDuration(Date.now() - startTime);
    setStartTime(0);
    setExplodedAt(minesweeper.failedAt);
    setMessage(
      `You've failed.${
        isCheater ? " Despite cheating, you've still failed." : ''
      }`
    );
  };
  const handleToggleCheater = () => {
    if (!isCheater) {
      setMessage('CHEATER!');
    }
    setIsCheater(!isCheater);
  };

  const handleFlag = i => {
    minesweeper.flagSquare(i);
    setBoard([...minesweeper.board]);
  };
  const handleReveal = i => {
    let result;
    result = minesweeper.revealSquare(i);
    setBoard([...minesweeper.board]);
    if (result === WIN) {
      handleWin();
    } else if (result === LOSS) {
      handleLoss();
    }
  };

  return (
    <Layout title={`Minesweeper`}>
      <GameControls>
        <button onClick={handleNewGameClick}>New Game</button>
        <button onClick={handleToggleCheater}>
          {isCheater ? 'I dont wanna cheat no more' : 'Lemme peek at the board'}
        </button>
      </GameControls>
      <GameStatus
        count={mineCount}
        duration={duration}
        message={message}
      />
      <GameBoard
        board={board}
        boardSize={boardSize}
        cheat={isCheater}
        explodedAt={explodedAt}
        onFlag={handleFlag}
        onReveal={handleReveal}
      />
    </Layout>
  );
};

export default Index;
