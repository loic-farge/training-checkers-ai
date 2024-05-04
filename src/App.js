import React, { useState } from 'react';
import Board from './components/Board';
import GameControl from './components/GameControl';
import './App.css';

const App = () => {
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [board, setBoard] = useState(null); // Placeholder for board state
    
    const handleRestart = () => {
        // Logic to restart the game goes here
    };

    const handleMove = () => {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      // You'll need to add logic here for updating the board state after a move
  };

    return (
        <div className="App">
            <h1>Checkers Game</h1>
            <GameControl currentPlayer={currentPlayer} onRestart={handleRestart} />
            <Board board={board} currentPlayer={currentPlayer} setCurrentPlayer={handleMove} />
        </div>
    );
};

export default App;
