const WIN = 'win';
const LOSS = 'loss';
const randoItem = arr => arr[Math.floor(Math.random() * arr.length)];
export { WIN, LOSS };

export default class Minesweeper {
  constructor(size) {
    // if the game has been won or lost
    this.status = null;

    this.size = size;
    const squareCount = size * size;

    // setup board
    this.board = [...Array(squareCount).keys()].map(i => ({
      index: i,
      revealed: false,
      mine: false,
      flagged: false,
      count: 0
    }));

    this.mines = [];
    // TODO - adjustable difficulty
    let mineCount = Math.ceil(squareCount * 0.1);
    while (mineCount) {
      let sq = randoItem(this.board);
      if (!sq.mine) {
        // make this a mine
        sq.mine = true;
        // add this mine to the list of mines
        this.mines.push(sq);
        this.getNeighbors(sq.index).forEach(neighbor => (neighbor.count += 1));
        mineCount -= 1;
      }
    }
  }

  revealSquare(i) {
    if (this.status) return;

    const square = this.board[i];
    if (!square.revealed && !square.flagged) {
      // if count is zero, flood fill other 0's
      if (!square.mine && square.count === 0) {
        const flood = i => {
          const sq = this.board[i];
          if (sq.count || sq.revealed || sq.flagged) {
            return;
          }

          sq.revealed = true;

          this.getNeighbors(sq.index, true).forEach(neighbor => {
            // if neighbor has a zero count, continue flood
            if (!neighbor.count && !neighbor.mine) {
              flood(neighbor.index);
            }
            // if neighbor is not a mine, reveal it
            if (!neighbor.mine && !neighbor.flagged) {
              neighbor.revealed = true;
            }
          });
        };
        flood(i);
      } else {
        square.revealed = true;
      }
      // NOTE - useful for figuring out which square
      // exploded in failure scenario
      this.lastRevealed = i;
    }

    return this.evaluateGame();
  }

  getNeighbors(i, cardinalOnly = false) {
    const { x, y } = this.indexToCoords(i);
    // TODO - maybe procedurally generate this list and filter
    // down to cardinal only (if sum of offsets is either 1 or -1)
    let toVisit = cardinalOnly
      ? [[-1, 0], [0, -1], [0, 1], [1, 0]]
      : [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const neighbors = [];
    toVisit.forEach(([xOffset, yOffset]) => {
      const xx = x - xOffset;
      const yy = y - yOffset;
      if (xx >= 0 && xx <= this.size - 1 && yy >= 0 && yy <= this.size - 1) {
        const index = this.coordsToIndex(xx, yy);
        neighbors.push(this.board[index]);
      }
    });
    return neighbors;
  }

  indexToCoords(i) {
    return {
      x: i % this.size,
      y: Math.floor(i / this.size)
    };
  }

  coordsToIndex(x, y) {
    return x + y * this.size;
  }

  flagSquare(i) {
    if (this.status) return;

    const square = this.board[i];
    if (!square.revealed) {
      this.board[i].flagged = !this.board[i].flagged;
    }
    return this.evaluateGame();
  }

  // check if game is won or lost, and return
  // the status
  evaluateGame() {
    if (this.mines.some(m => m.revealed)) {
      // if any mines are revealed the game is lost
      this.status = LOSS;
      this.failedAt = this.lastRevealed;
      this.board.forEach(sq => (sq.revealed = true));
    } else if (this.board.every(m => m.mine || m.revealed)) {
      // if all non-mine squares are revealed, win!
      this.status = WIN;
      this.board.forEach(sq => (sq.revealed = true));
    }
    return this.status;
  }
}
