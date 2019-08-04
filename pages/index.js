import { useState, useEffect } from "react";
import Layout from '../components/layout';

// game components
import Desk from '../components/desk';
import Square from '../components/square';
import Mine from '../components/mine';
import Flag from '../components/flag';

const WON = "won"
const LOST = "lost"

const randoItem = arr => arr[Math.floor(Math.random() * arr.length)]

class Minesweeper {
    constructor(size) {
        // if the game has been won or lost
        this.status = null

        this.size = size
        const squareCount = size * size

        // setup board
        this.board = [...Array(squareCount).keys()].map(i => ({
            index: i,
            revealed: false,
            mine: false,
            flagged: false,
            count: 0,
        }))

        this.mines = []
        // TODO - adjustable difficulty
        let mineCount = Math.ceil(squareCount * 0.1)
        while(mineCount){
            let sq = randoItem(this.board)
            if(!sq.mine){
                // make this a mine
                sq.mine = true
                // add this mine to the list of mines
                this.mines.push(sq)

                const x1 = sq.index % this.size
                const y1 = Math.floor(sq.index / this.size)

                // visit neighbors and notify they are
                // mine-adjacent
                for(let offsetX = -1; offsetX <= 1; offsetX++){
                    const xx = x1 - offsetX
                    // ensure potential column is within the grid. ie it is
                    // not column -1 or something
                    if(xx >= 0 && xx <= this.size - 1) {
                        for(let offsetY = -1; offsetY <= 1; offsetY++){
                            const yy = y1 - offsetY
                            // ensure potential row is within the grid. ie it is
                            // not a row that is past the end of the grid
                            if(yy >= 0 && yy <= this.size - 1) {
                                const index = xx + (yy * this.size)
                                this.board[index].count += 1
                            }
                        }
                    }
                }
                mineCount -= 1
            }
        }
        
        this.start = new Date().getTime()
    }

    revealSquare(i){
        if(this.status) return

        const square = this.board[i]
        if(!square.revealed && !square.flagged){
            // if count is zero, flood fill other 0's
            if(!square.mine && square.count === 0){
                const flood = i => {
                    const sq = this.board[i]
                    if(sq.count || sq.revealed || sq.flagged){
                        return
                    }
                    const x1 = sq.index % this.size
                    const y1 = Math.floor(sq.index / this.size)
                    sq.revealed = true

                    // examine neighbors
                    const neighbors = []
                    // west
                    if(x1 - 1 >= 0) neighbors.push((y1 * this.size) + (x1 - 1))
                    // east
                    if(x1 + 1 < this.size) neighbors.push((y1 * this.size) + (x1 + 1))
                    // north
                    if(y1 - 1 >= 0) neighbors.push(((y1 - 1) * this.size) + x1)
                    // south
                    if(y1 + 1 < this.size) neighbors.push(((y1 + 1) * this.size) + x1)

                    neighbors.forEach(j => {
                        const neighbor = this.board[j]
                        // if neighbor has a zero count, continue flood
                        if(!neighbor.count && !neighbor.mine){
                            flood(j)
                        }
                        // if neighbor is not a mine, reveal it
                        if(!neighbor.mine && !neighbor.flagged){
                            neighbor.revealed = true
                        }
                    })

                }
                flood(i)
            } else {
                square.revealed = true;
            }
        }

        return this.evaluateGame();
    }

    flagSquare(i){
        if(this.status) return

        const square = this.board[i]
        if(!square.revealed){
            this.board[i].flagged = !this.board[i].flagged
        }
        return this.evaluateGame();
    }

    // check if game is won or lost, and return
    // the status
    evaluateGame(){
        if(this.mines.some(m => m.revealed)){
            // if any mines are revealed the game is lost
            // TODO - focus the recently revealed mine?
            this.endGame(LOST);
        } else if(this.board.every(m => m.mine || m.revealed)){
            // if all non-mine squares are revealed, win!
            this.endGame(WON)
        }
        return this.status
    }

    endGame(status){
        this.end = new Date().getTime()
        this.status = status
        this.board.forEach(sq => sq.revealed = true)
    }
}

// i guess its a singleton
let minesweeper

const Index = () => {
    const [boardSize, setBoardSize] = useState(10);
    const [board, setBoard] = useState([]);
    const [gameStatus, setGameStatus] = useState(null);
    const [cheater, setCheater] = useState(false);
    const [minesCount, setMinesCount] = useState(0);

    // TODO - is this the correct way to do setup/teardown?
    useEffect(() => {
        newGame()
    }, [])

    const newGame = () => {
        minesweeper = new Minesweeper(boardSize)
        // setup initial game state
        setBoard(minesweeper.board)
        setMinesCount(minesweeper.mines.length)
        setGameStatus(minesweeper.status)
    }

    const handleClick = (e, i) => {
        if(e.button === 2){
            e.preventDefault()
            minesweeper.flagSquare(i)
        } else {
            minesweeper.revealSquare(i)
        }
        setBoard([...minesweeper.board])
        setMinesCount(minesweeper.mines.length)
        setGameStatus(minesweeper.status)
    }

    const handleNewGame = () => {
        newGame()
    }

    const handleToggleCheater = () => {
        setCheater(!cheater)
    }

    return (
      <Layout title={`Minesweeper`}>
        <div>
            <button onClick={handleNewGame}>New Game</button>&nbsp;
            <button onClick={handleToggleCheater}>
                {cheater ? "I swear ive changed" : "I am a cheater"}
            </button>&nbsp;
            {gameStatus || "grape job so far"}
            <div>{minesCount}</div>
        </div>
        <Desk boardSize={boardSize}>
          {board.map(sq => (
            <Square
              key={sq.index}
              disabled={sq.revealed}
              onClick={e => handleClick(e, sq.index)}
              onContextMenu={e => handleClick(e, sq.index)}
            >
              { /* TODO - theres certainly a more succinct way */ }
              {!sq.revealed && sq.flagged && <Flag />}
              {(cheater || sq.revealed) && sq.mine && <Mine />}
              {(cheater || sq.revealed) && !sq.mine && !!sq.count && sq.count}
            </Square>
          ))}
        </Desk>
      </Layout>
    );
}

export default Index;
