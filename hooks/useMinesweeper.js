import { useState } from 'react';
import Minesweeper, { WIN, LOSS } from '../components/Minesweeper';

const useMinesweeper = () => {
  const [minesweeper, setMinesweeper] = useState(new Minesweeper(10));
  const [board, setBoard] = useState([]);
  const [mineCount, setMineCount] = useState(0);
  const [explodedAt, setExplodedAt] = useState(null);

  const newGame = boardSize => {
    const m = new Minesweeper(boardSize);
    setMinesweeper(m);
    setBoard([...m.board]);
    setMineCount(m.mines.length);
    setExplodedAt(null);
  };

  const flagSquare = i => {
    minesweeper.flagSquare(i);
    setBoard([...minesweeper.board]);
  };
  const revealSquare = i => {
    let result;
    result = minesweeper.revealSquare(i);
    setBoard([...minesweeper.board]);
    setExplodedAt(minesweeper.failedAt);
    return result;
  };

  return {
    board,
    mineCount,
    explodedAt,
    flagSquare,
    revealSquare,
    newGame
  };
};

export { WIN, LOSS }
export default useMinesweeper
