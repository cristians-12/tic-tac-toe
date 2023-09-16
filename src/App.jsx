import { useState , useEffect} from "react";
import confetti from "canvas-confetti";
import "./App.css";
import "./index.css";
import { Square } from "./components/Square.jsx";
import { TURNS, winner_combos } from "./constants";
import { checkWinner,finJuego,resetGame } from "./logic/board";
import { Winner } from "./components/WinnerModal.jsx"
import {Turn} from "./components/Turn.jsx"

function App() {
  // const [board, setBoard] = useState(Array(9).fill(null));

  const [board, setBoard] = useState(()=>{
    const boardDelStorage = window.localStorage.getItem('board')
    return boardDelStorage ? JSON.parse(boardDelStorage):Array(9).fill(null)
  })

  // const [turn, setTurn] = useState(TURNS.X);

  useEffect(()=>{
    // console.log("sheim")
  })
    const [turn,setTurn] = useState(()=>{
      const turnStorage = window.localStorage.getItem('turno')
      return turnStorage ?? TURNS.X
    })

  const [winner, setWinner] = useState(null);


  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turno')
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    // console.log(index)
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turno',newTurn)

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (finJuego(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">

      <h1>Tricki</h1>

      <button onClick={resetGame}>Reset juego</button>

      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <Turn
        turn={turn}
      />
      <Winner
        resetGame={resetGame}
        winner={winner}
      />
    </main>
  );
}

export default App;
