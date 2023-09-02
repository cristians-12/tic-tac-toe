import { winner_combos } from '../constants.js'
import {TURNS} from '../constants.js'
// import {setBoard,setTurn} from '../App.jsx'

export const checkWinner = (boardRevisar)=>{//funcion para verificar ganadores
  for(const combo of winner_combos){
    const [a,b,c] = combo;
    if(
      boardRevisar[a] && boardRevisar[b]==boardRevisar[a] && boardRevisar[c]==boardRevisar[a]
    ){
      return boardRevisar[a]
    }
  }
  return null
}

export const finJuego = (newBoard) =>{
  return newBoard.every((square)=>square!==null)
}

export const resetGame = () => {
  setBoard(Array(9).fill(null));
  setTurn(TURNS.X);
  setWinner(null);
};