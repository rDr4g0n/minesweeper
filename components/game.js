import { useState, useEffect } from 'react';

import Minesweeper, { WIN, LOSS } from './Minesweeper';
import Desk from './desk';
import Square from './square';
import Mine from './mine';
import Flag from './flag';

// TODO - find the right way to deal with this "singleton" approach
let minesweeper;

export default function Game({ boardSize, cheat=false, onWin, onLoss }) {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    minesweeper = new Minesweeper(boardSize);
    setBoard(minesweeper.board);
  }, []);

  const examineStatus = () => {
    switch (minesweeper.status) {
      case WIN:
        onWin();
        break;
      case LOSS:
        onLoss();
        break;
      default:
        break;
    }
  };

  const handleClick = (e, i) => {
    if (e.button === 2) {
      e.preventDefault();
      minesweeper.flagSquare(i);
    } else {
      minesweeper.revealSquare(i);
    }
    setBoard([...minesweeper.board]);
    examineStatus()
  };

  return (
    <Desk boardSize={boardSize}>
      {board.map(sq => (
        <Square
          key={sq.index}
          disabled={sq.revealed}
          onClick={e => handleClick(e, sq.index)}
          onContextMenu={e => handleClick(e, sq.index)}
        >
          {/* TODO - theres certainly a more succinct way */}
          {!sq.revealed && sq.flagged && <Flag />}
          {(cheat || sq.revealed) && sq.mine && <Mine />}
          {(cheat || sq.revealed) && !sq.mine && !!sq.count && sq.count}
        </Square>
      ))}
    </Desk>
  );
}
