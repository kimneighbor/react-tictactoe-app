import "./App.css"
import Board from "./components/Board";
import React, {useState} from "react";
import Confetti from "react-confetti";

function App() {
    // 게임 히스토리 상태 관리
    const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
    // 현재 플레이어('X' 또는 'O') 상태 관리
    const [xIsNext, setXIsNext] = useState(true);
    // 현재 히스토리 이동(게임 진행률) 상태 관리
    const [stepNumber, setStepNumber] = useState(0);

    // 게임 보드의 승자를 계산하는 함수
    const calculateWinner = (squares) => {
        // 가능한 승리 조건들
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        // 승리 조건을 검사하여 승자 확인
        for (let index = 0; index < lines.length; index++) {

            const [a, b, c] = lines[index];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    // 현재 이동 상태
    const current = history[stepNumber];
    // 현재 게임 보드에서의 승자 확인
    const winner = calculateWinner(current.squares);

    // 게임 상태 메세지
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    // 게임 보드 클릭 이벤트 처리 함수
    const handleClick = (i) => {
        const newHistory = history.slice(0, stepNumber + 1);
        const newCurrent = newHistory[newHistory.length - 1];
        const newSquares = newCurrent.squares.slice();
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }
        newSquares[i] = xIsNext ? 'X' : 'O';
        setHistory([...newHistory, {squares: newSquares}]);
        setXIsNext(prev => !prev);

        setStepNumber(newHistory.length);
    }

    // 게임 히스토리를 기록하기 위한 이동 목록 생성
    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li className="createList" key={move}>
                <button className="move-btn" onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        )
    })

    // 다른 히스토리 번호로 돌아가기 위한 함수
    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);

    }

    // 앱 렌더링 부분: 게임 구성 요소와 정보 표시
    return (
        <div className="game">
            {winner && <Confetti />} {/* 승자가 결정되었을 때만 Confetti 컴포넌트 렌더링 */}
            <div className="game-board">
                <Board squares={current.squares} onClick={(i) => handleClick(i)} />
            </div>
            <div className="game-info">
                <div className="status">{status}</div>
                <ol style={{ listStyle: "none" }}>{moves}</ol>
            </div>
        </div>
    );
}

export default App;
