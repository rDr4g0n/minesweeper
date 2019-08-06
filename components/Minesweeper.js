// NOTE - i have no idea where totaolly non-react related code should live

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
        this.getNeighbors(sq.index).forEach(neighbor => neighbor.count += 1)
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

          const { x, y } = this.indexToCoords(sq.index)
          sq.revealed = true;

          // examine neighbors
          const neighbors = [];
          // west
          if (x - 1 >= 0) neighbors.push(y * this.size + (x - 1));
          // east
          if (x + 1 < this.size) neighbors.push(y * this.size + (x + 1));
          // north
          if (y - 1 >= 0) neighbors.push((y - 1) * this.size + x);
          // south
          if (y + 1 < this.size) neighbors.push((y + 1) * this.size + x);

          neighbors.forEach(j => {
            const neighbor = this.board[j];
            // if neighbor has a zero count, continue flood
            if (!neighbor.count && !neighbor.mine) {
              flood(j);
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
    }

    return this.evaluateGame();
  }

  getNeighbors(i, cardinalOnly = false) {
    const { x, y } = this.indexToCoords(i)
    const neighbors = [];
    for (let offsetX = -1; offsetX <= 1; offsetX++) {
      const xx = x - offsetX;
      // ensure potential column is within the grid. ie it is
      // not column -1 or something
      if (xx >= 0 && xx <= this.size - 1) {
        for (let offsetY = -1; offsetY <= 1; offsetY++) {
          const yy = y - offsetY;
          // ensure potential row is within the grid. ie it is
          // not a row that is past the end of the grid
          if (yy >= 0 && yy <= this.size - 1) {
            const index = xx + yy * this.size;
            neighbors.push(this.board[index])
          }
        }
      }
    }
    return neighbors
  }

  indexToCoords(i){
    return {
        x: i % this.size,
        y: Math.floor(i / this.size)
    }
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
      // TODO - focus the recently revealed mine?
      this.endGame(LOSS);
    } else if (this.board.every(m => m.mine || m.revealed)) {
      // if all non-mine squares are revealed, win!
      this.endGame(WIN);
    }
    return this.status;
  }

  endGame(status) {
    this.status = status;
    this.board.forEach(sq => (sq.revealed = true));
  }
}
