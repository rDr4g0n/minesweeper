import { useState, useEffect, useRef } from 'react';
import Layout from '../components/layout';
import Button from '../components/button';
import GameControls from '../components/gamecontrols';
import GameStatus from '../components/gamestatus';
import GameBoard from '../components/gameboard';
import useMinesweeper, { WIN, LOSS } from '../hooks/useMinesweeper';

const Index = () => {
  const [boardSize, setBoardSize] = useState(20);
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

  const setupNewGame = () => {
    newGame(boardSize);
    setMessage("GO FOR IT!");
    setStartTime(Date.now());
    setDuration(0);
  };

  useEffect(() => {
    setupNewGame();
  }, []);

  const updateDuration = () => {
    // if no start time is set, then no game is in progress
    if (startTime) {
      setDuration(Date.now() - startTime);
    }
  };

  // ensure that setInterval callback is always looking
  // at the latest instance of updateDuration
  useEffect(() => {
    durationTick.current = updateDuration;
  });

  // constantly update game duration
  useEffect(() => {
    const intervalId = setInterval(() => {
      durationTick.current();
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  const handleToggleCheater = () => {
    if (!isCheater) {
      setMessage('CHEATER! ');
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
          `Ouch. ${
            isCheater ? " Despite cheating, you've still failed." : ''
          }`
        );
      }
    }
  };

  return (
    <Layout boardSize={boardSize}>
      <GameControls>
        <Button text onClick={handleToggleCheater}>
          {isCheater ? '😇' : '😈'}
        </Button>
      </GameControls>
      <GameStatus count={mineCount} duration={duration}>
        {message}
        {explodedAt && <Button inline onClick={setupNewGame}>Try Again?</Button>}
      </GameStatus>
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
