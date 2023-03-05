import {useState} from 'react';

import confetti from "canvas-confetti";

import { Board } from './components/Board';
import { WinnerModal } from "./components/WinnerModal";
import { TurnInfo } from './components/TurnInfo';

import { TURNS } from "./constants";

import { checkWinner } from "./utils/checkWinner";
import { checkEndGame } from "./utils/checkEndGame";
import { resetGameStorage, saveGameToStorage } from './utils/storage';

function App() {
  
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState( () => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });

  // null -> not exist winner
  // false -> tie
  // true -> exist winner
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  }  

  const updateBoard = (index) => {
    
    if(board[index] || winner) return;

    // update board
    const newBoard = [... board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    
    saveGameToStorage({
      board:newBoard,
      turn: newTurn 
    });

    // check if exist winner
    const newWinner = checkWinner(newBoard);
    if(newWinner){
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  return (
    <main className="board">
        <h1>ta-te-ti</h1>
        <button onClick={resetGame}>reset game</button>
        <section className='game'>
          {
            <Board 
              board={board} 
              updateBoard={updateBoard }
            />
          }
        </section>
        
        <TurnInfo
          turn={turn}
        />

        <WinnerModal 
          winner={winner}
          resetGame={resetGame}
        />
    </main>
  )
}

export default App
