import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import GameControls from '../components/gamecontrols';
import GameStatus from '../components/gamestatus';
import GameBoard from '../components/gameboard';
import useMinesweeper, { WIN, LOSS } from "../hooks/useMinesweeper"

// TODO - fix this, useState
let startTime = 0;
let setStartTime = val => (startTime = val);

const Index = () => {
  const [boardSize, setBoardSize] = useState(10);
  const [message, setMessage] = useState('Loading');
  const [isCheater, setIsCheater] = useState(false);
  const [duration, setDuration] = useState(0);
  // const [startTime, setStartTime] = useState(0);

  const {
    board,
    mineCount,
    explodedAt,
    flagSquare,
    revealSquare,
    newGame
  } = useMinesweeper();

  useEffect(() => {
    newGame(boardSize);
    setMessage("Let's do it");
    setStartTime(Date.now());
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

  const handleNewGameClick = () => {
    newGame(boardSize);
    setMessage("Let's do it" + Math.random());
    setStartTime(Date.now());
  };

  const handleToggleCheater = () => {
    if (!isCheater) {
      setMessage('CHEATER!');
    }
    setIsCheater(!isCheater);
  };

  const handleFlag = i => {
    flagSquare(i);
  };

  const handleReveal = i => {
    const status = revealSquare(i);
    if (status) {
      setDuration(Date.now() - startTime);
      setStartTime(0);
      if (status === WIN) {
        setMessage("You've done it.");
      } else if (status === LOSS) {
        setMessage(
          `You've failed.${
            isCheater ? " Despite cheating, you've still failed." : ''
          }`
        );
      }
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
      <GameStatus count={mineCount} duration={duration} message={message} />
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
