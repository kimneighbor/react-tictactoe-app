import "./App.css"
import Board from "./components/Board";

function App() {
    return (
        <div className="game">
            <div className="game-board">
                <Board/>
            </div>
            {/*주석 다는 방법*/}
            <div className="game-info">
                game-info
            </div>
        </div>
    );

}
export default App;
