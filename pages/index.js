import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import Game from '../components/game';

const Index = () => {
  const [boardSize, setBoardSize] = useState(10);
  const [gameId, setGameId] = useState(0);
  const [message, setMessage] = useState('So far, so good');
  const [isCheater, setIsCheater] = useState(false);

  // NOTE - this seems to be a suitable way to dispose the old game
  // and create a fresh one
  const handleNewGameClick = () => {
    setMessage('Another go, eh?');
    setGameId(gameId + 1);
  };
  const handleWin = () => {
    setMessage("You've done it.");
  };
  const handleLoss = () => {
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

  return (
    <Layout title={`Minesweeper`}>
      <div>
        <button onClick={handleNewGameClick}>New Game</button>
        <button onClick={handleToggleCheater}>
          {isCheater ? 'I dont wanna cheat no more' : 'Lemme peek at the board'}
        </button>
        <div>{message}</div>
      </div>
      <Game
        key={gameId}
        boardSize={boardSize}
        cheat={isCheater}
        onWin={handleWin}
        onLoss={handleLoss}
      />
    </Layout>
  );
};

export default Index;
