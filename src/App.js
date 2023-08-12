import "./App.css"
import Board from "./components/Board";
import React, {useState} from "react";

function App() {
    const [history, setHistory] = useState([{squares: Array(9).fill(null) }]);
    const [xIsNext, setXIsNext] = useState(true);





    const calculateWinner = (squares) => {

        const lines= [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for (let index = 0; index < lines.length; index++) {

            const [a, b, c] = lines[index];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);


    let status;
    if(winner) {
        status = 'Winner: ' + winner;
    }else{
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    const handleClick = (i) => {
        const newSquares = current.squares.slice();
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }
        newSquares[i] = xIsNext ? 'X' : 'O';
        setHistory([...history, {squares: newSquares}]);
        setXIsNext(prev => !prev);
    }

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
            return (
                <li>
                    <button className="btn">{desc}</button>
                </li>
            )
    })

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={(i) => handleClick(i)}/>
            </div>
            {/*주석 다는 방법*/}
            <div className="game-info">
                <div className='status'>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );

}
export default App;
