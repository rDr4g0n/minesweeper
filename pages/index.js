import { useState, useEffect } from "react";
import Layout from '../components/layout';

// game components
import Desk from '../components/desk';
import Square from '../components/square';
import Mine from '../components/mine';
import Flag from '../components/flag';

class Minesweeper {
    constructor(size, diff) {
        // TODO - use diff to set mine chance
        return [...Array(size).keys()].map(i => ({
            key: i,
            revealed: false,
            mine: Math.random() > 0.9 ? true : false,
            flag: false,
            count: 0,
        }))
    }
}
const generateGameBoard = (size, diff) => new Minesweeper(size, diff)


const Index = () => {
    const [boardSize, setBoardSize] = useState(10);
    const [board, setBoard] = useState([]);

    // TODO - is this the correct way to do setup/teardown?
    useEffect(() => {
        // setup initial game board
        setBoard(generateGameBoard(boardSize * boardSize));
    }, [])

    const handleClick = (e, i) => {
        const b = [...board]
        b[i] = Object.assign(
            {},
            b[i],
            { revealed: true }
        )
        setBoard(b)
    }

    return (
      <Layout title={`Minesweeper (active)`}>
        <Desk boardSize={boardSize}>
          {board.map((sq, i) => (
            <Square
              key={i}
              // disabled={i === 55 || i === 10}
              onClick={e => handleClick(e, i)}
            >
              { /* TODO - theres certainly a more succinct way */ }
              {sq.revealed && sq.mine && <Mine />}
              {sq.revealed && sq.flag && <Flag />}
              {sq.revealed && !sq.mine && !sq.flag && sq.count}
            </Square>
          ))}
        </Desk>
      </Layout>
    );
}

export default Index;
