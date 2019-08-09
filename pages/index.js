import { useState, useEffect, useRef } from 'react';
import Layout from '../components/layout';
import GameControls from '../components/gamecontrols';
import GameStatus from '../components/gamestatus';
import GameBoard from '../components/gameboard';
import useMinesweeper, { WIN, LOSS } from "../hooks/useMinesweeper"

const Index = () => {
  const [boardSize, setBoardSize] = useState(10);
  const [message, setMessage] = useState('Loading');
  const [isCheater, setIsCheater] = useState(false);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const durationTick = useRef();

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

  const updateDuration = () => {
      // if no start time is set, then no game is in progress
      if (startTime) {
        setDuration(Date.now() - startTime);
      }
  }

  // ensure that setInterval callback is always looking
  // at the latest instance of updateDuration
  useEffect(() => {
    durationTick.current = updateDuration
  });

  // constantly update game duration
  useEffect(() => {
    console.log("setting interval")
    const intervalId = setInterval(() => {
        durationTick.current()
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  const handleNewGameClick = () => {
    newGame(boardSize);
    setMessage("Let's do it" + Math.random());
    setStartTime(Date.now());
    setDuration(0);
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
