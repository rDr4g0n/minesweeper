import Desk from './desk';
import Square from './square';

const GameBoard = ({
  board,
  boardSize,
  explodedAt,
  cheat,
  onFlag,
  onReveal
}) => {
  const handleClick = (e, i) => {
    if (e.button === 2) {
      e.preventDefault();
      onFlag(i);
    } else {
      onReveal(i);
    }
  };
  return (
    <Desk boardSize={boardSize}>
      {board.map(sq => (
        <Square
          key={sq.index}
          revealed={sq.revealed}
          flagged={sq.flagged}
          mine={sq.mine}
          count={sq.count}
          peek={cheat}
          exploded={explodedAt && sq.index === explodedAt}
          onClick={e => handleClick(e, sq.index)}
          onContextMenu={e => handleClick(e, sq.index)}
        />
      ))}
    </Desk>
  );
};

export default GameBoard;
