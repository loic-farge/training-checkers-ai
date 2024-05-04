import React from 'react';
import './Square.css'; // This will be your CSS file for the Square component

const Square = ({ isBlack, children, onClick, highlight }) => {
    const squareClass = `square ${isBlack ? 'black' : 'white'}${highlight ? ' highlight' : ''}`;

    return (
        <div className={squareClass} onClick={onClick}>
            {children}
        </div>
    );
};

export default Square;
