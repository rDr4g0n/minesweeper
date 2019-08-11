import { useState, useRef } from 'react';
import Minesweeper, { WIN, LOSS } from '../components/Minesweeper';

const useMinesweeper = () => {
  const minesweeper = useRef(new Minesweeper(10));
  const [board, setBoard] = useState([]);
  const [mineCount, setMineCount] = useState(0);
  const [explodedAt, setExplodedAt] = useState(null);

  const newGame = boardSize => {
    minesweeper.current = new Minesweeper(boardSize);
    setBoard([...minesweeper.current.board]);
    setMineCount(minesweeper.current.mines.length);
    setExplodedAt(null);
  };

  const flagSquare = i => {
    minesweeper.current.flagSquare(i);
    setBoard([...minesweeper.current.board]);
  };
  const revealSquare = i => {
    let result;
    result = minesweeper.current.revealSquare(i);
    setBoard([...minesweeper.current.board]);
    setExplodedAt(minesweeper.current.failedAt);
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

export { WIN, LOSS };
export default useMinesweeper;
