import React from 'react';
import Square from '../Square';
import Piece from '../Piece';
import './Board.css';
import useBoard from '../../hooks/useBoard';

const Board = ({currentPlayer, setCurrentPlayer}) => {
  const { board, selectedPiece, legalMoves, selectPiece, movePiece } = useBoard(currentPlayer, setCurrentPlayer);

  const renderSquare = (i, j, piece) => {
    const legalMove = legalMoves.find(move => move.row === i && move.col === j);

    if (piece) {
      console.log(piece.isKing);
    }
    
    return (
      <Square
        key={`${i}-${j}`}
        isBlack={(i + j) % 2 === 1}
        onClick={() => {
          if (selectedPiece && legalMove) {
            movePiece(i, j, legalMove.captured);
          } else {
            selectPiece(i, j);
          }
        }}
        highlight={!!legalMove}
      >
        {piece && (
          <Piece
            isKing={piece.isKing}
            player={piece.player}
            selected={selectedPiece && selectedPiece.row === i && selectedPiece.col === j}
          />
        )}
      </Square>
    );
  };

  const renderBoard = () => {
    return board.map((row, i) => (
      <div key={i} className="board-row">
        {row.map((piece, j) => renderSquare(i, j, piece))}
      </div>
    ));
  };

  return <div className="board">{renderBoard()}</div>;
};

export default Board;
