import React from 'react';
import './Piece.css'; // This will be your CSS file for the Piece component

const Piece = ({ isKing, player, selected }) => {
    const pieceClasses = `piece player-${player}` + (isKing ? ' king' : '') + (selected ? ' selected' : '');

    return <div className={pieceClasses}></div>;
};

export default Piece;
