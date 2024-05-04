import React from 'react';
import './GameControl.css';

const GameControl = ({ currentPlayer, onRestart }) => {
    return (
        <div className="game-control">
            <div className="current-player">Current Player: {currentPlayer === 1 ? "White" : "Black"}</div>
            <button onClick={onRestart} className="restart-button">Restart Game</button>
        </div>
    );
};

export default GameControl;
