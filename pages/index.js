import { useState, useEffect } from "react";
import Layout from '../components/layout';

// game components
import Desk from '../components/desk';
import Square from '../components/square';
import Mine from '../components/mine';
import Flag from '../components/flag';

const randoItem = arr => arr[Math.floor(Math.random() * arr.length)]

class Minesweeper {
    constructor(size) {
        this.size = size
        const squareCount = size * size

        // setup board
        this.board = [...Array(squareCount).keys()].map(i => ({
            index: i,
            revealed: true,
            mine: false,
            flagged: false,
            count: 0,
        }))

        // TODO - adjustable difficulty
        let mineCount = Math.ceil(squareCount * 0.05)
        while(mineCount){
            let sq = randoItem(this.board)
            if(!sq.mine){
                // make this a mine
                sq.mine = true

                const neighbors = []
                const x1 = sq.index % this.size
                const y1 = Math.floor(sq.index / this.size)

                // visit neighbors and notify they are
                // mine-adjacent
                for(let offsetX = -1; offsetX <= 1; offsetX++){
                    const xx = x1 - offsetX
                    if(xx >= 0 && xx <= this.size - 1) {
                        for(let offsetY = -1; offsetY <= 1; offsetY++){
                            const yy = y1 - offsetY
                            if(yy >= 0 && yy <= this.size - 1) {
                                const index = xx + (yy * this.size)
                                if(!this.board[index]) debugger
                                this.board[index].count += 1
                            }
                        }
                    }
                }



                mineCount -= 1
            }
        }
        
        this.start = new Date().getTime()
        this.failed = false
    }

    revealSquare(i){
        const square = this.board[i]
        if(!square.revealed){
            // always unflag before reveal
            square.flagged = false;
            square.revealed = true;
            if(square.mine){
                // TODO - kick off failure score, cleanup, etc
                return false
            }
        }
        return true
    }

    flagSquare(i){
        const square = this.board[i]
        if(!square.revealed){
            this.board[i].flagged = !this.board[i].flagged
        }
    }

    endGame(){
        this.end = new Date().getTime()
        this.failed = true
    }
}

// i guess its a singleton
let minesweeper

const Index = () => {
    const [boardSize, setBoardSize] = useState(7);
    const [board, setBoard] = useState([]);

    // TODO - is this the correct way to do setup/teardown?
    useEffect(() => {
        minesweeper = new Minesweeper(boardSize)
        // setup initial game state
        setBoard(minesweeper.board)
    }, [])

    const handleClick = (e, i) => {
        let isSafe = true
        if(e.button === 2){
            e.preventDefault()
            minesweeper.flagSquare(i)
        } else {
            isSafe = minesweeper.revealSquare(i)
        }
        setBoard([...minesweeper.board])
        if(!isSafe) {
            console.log("ASPLODE")
            // TODO - failure state
        }
    }

    return (
      <Layout title={`Minesweeper (active)`}>
        <Desk boardSize={boardSize}>
          {board.map(sq => (
            <Square
              key={sq.index}
              // disabled={i === 55 || i === 10}
              onClick={e => handleClick(e, sq.index)}
              onContextMenu={e => handleClick(e, sq.index)}
            >
              { /* TODO - theres certainly a more succinct way */ }
              {!sq.revealed && sq.flagged && <Flag />}
              {sq.revealed && sq.mine && <Mine />}
              {sq.revealed && !sq.mine && sq.count}
            </Square>
          ))}
        </Desk>
      </Layout>
    );
}

export default Index;
