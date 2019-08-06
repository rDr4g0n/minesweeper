import React from 'react';

import Minesweeper, { WIN, LOSS } from './Minesweeper';
import Desk from './desk';
import Square from './square';
import Mine from './mine';
import Flag from './flag';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    // TODO - is this an acceptable way to hang on to non-reactive state?
    this.minesweeper = new Minesweeper(this.props.boardSize);
    this.state = {
      board: this.minesweeper.board,
      exploded: null,
    };
  }

  render() {
    return (
      <Desk boardSize={this.props.boardSize}>
        {this.state.board.map(sq => (
          <Square
            key={sq.index}
            disabled={sq.revealed}
            exploded={this.state.exploded && sq.index === this.state.exploded}
            onClick={e => this.handleClick(e, sq.index)}
            onContextMenu={e => this.handleClick(e, sq.index)}
          >
            {/* TODO - theres certainly a more succinct way */}
            {!sq.revealed && sq.flagged && <Flag />}
            {(this.props.cheat || sq.revealed) && sq.mine && <Mine />}
            {(this.props.cheat || sq.revealed) &&
              !sq.mine &&
              !!sq.count &&
              sq.count}
          </Square>
        ))}
      </Desk>
    );
  }

  handleClick(e, i) {
    let result;
    if (e.button === 2) {
      e.preventDefault();
      result = this.minesweeper.flagSquare(i);
    } else {
      result = this.minesweeper.revealSquare(i);
    }
    this.setState({
      board: [...this.minesweeper.board]
    });

    if (result === WIN) {
      this.props.onWin();
    } else if (result === LOSS) {
      this.state.exploded = this.minesweeper.failedAt
      this.props.onLoss();
    }
  }
}
