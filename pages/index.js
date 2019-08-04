import { useState } from "react";
import Layout from '../components/layout';

// game components
import Desk from '../components/desk';
import Square from '../components/square';
import Mine from '../components/mine';
import Flag from '../components/flag';

const generateGameBoard = (size, difficulty) => {
    // TODO - use diff to set mine chance
    return [...Array(size).keys()].map(i => ({
        key: i,
        revealed: false,
        mine: false,
        flag: false,
        count: 0,
    }))
}

const boardSize = 10;
const [board, setBoard] = useState([]);
setBoard(generateGameBoard(boardSize * boardSize));

const Index = () => {

    const handleClick = (e, i) => {
        const b = [...board]
        b[i] = Object.assign(
            {},
            b[i],
            { revealed: true }
        )
        setBoard(b)
    }

    return <Layout title={`Minesweeper (active)`}>
        <Desk boardSize={boardSize}>
          {board.map((sq, i) => (
            <Square
              key={i}
              // disabled={i === 55 || i === 10}
              onClick={e => handleClick(e, i)}
            >
              {sq.mine && <Mine />}
              {sq.flag && <Flag />}
              {sq.revealed && sq.count}
            </Square>
          ))}
        </Desk>
      </Layout>
}

export default Index;
