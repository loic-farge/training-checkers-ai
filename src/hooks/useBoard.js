import { useState } from 'react';

const initializeBoard = () => {
  const squares = Array(8).fill(null).map(() => Array(8).fill(null));
  // Set up pieces for players
  for (let i = 0; i < 8; i++) {
    for (let j = (i % 2); j < 8; j += 2) {
      if (i < 3) squares[i][j] = { player: 1, isKing: false };
      else if (i > 4) squares[i][j] = { player: 2, isKing: false };
    }
  }
  return squares;
};

const useBoard = (currentPlayer, setCurrentPlayer) => {
  const [board, setBoard] = useState(initializeBoard());
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);

  const checkForMoves = (player) => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.player === player) {
          const moves = getLegalMoves(piece, row, col);
          if (moves.length > 0) {
            return true; // Player can still make a move
          }
        }
      }
    }
    return false; // No moves left
  };

  const getLegalMoves = (piece, row, col, mustCapture = false) => {
    const moves = [];
    const directions = piece.isKing ? [[1, -1], [1, 1], [-1, -1], [-1, 1]] : (piece.player === 1 ? [[1, -1], [1, 1]] : [[-1, -1], [-1, 1]]);

    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (!board[newRow][newCol]) {
          moves.push({ row: newRow, col: newCol, captured: null });
        } else if (board[newRow][newCol].player !== currentPlayer) {
          const jumpRow = newRow + dx;
          const jumpCol = newCol + dy;
          if (jumpRow >= 0 && jumpRow < 8 && jumpCol >= 0 && jumpCol < 8 && !board[jumpRow][jumpCol]) {
            moves.push({ row: jumpRow, col: jumpCol, captured: { row: newRow, col: newCol } });
          }
        }
      }
    });
    return mustCapture ? moves.filter(move => move.captured) : moves;
  };

  const selectPiece = (row, col) => {
    const piece = board[row][col];
    if (piece && piece.player === currentPlayer) {
      setSelectedPiece({ ...piece, row, col });
      setLegalMoves(getLegalMoves(piece, row, col));
    } else {
      setSelectedPiece(null);
      setLegalMoves([]);
    }
  };

  const hasPiecesLeft = (player) => {
    return board.some(row => row.some(piece => piece && piece.player === player));
  };

  const checkGameOver = () => {
    const player1HasMoves = checkForMoves(1);
    const player2HasMoves = checkForMoves(2);
  
    const player1HasPieces = hasPiecesLeft(1);
    const player2HasPieces = hasPiecesLeft(2);
  
    if (!player1HasPieces || !player1HasMoves) {
      alert("Player 2 wins!");
      return true;
    } else if (!player2HasPieces || !player2HasMoves) {
      alert("Player 1 wins!");
      return true;
    }
    return false;
  };

  const movePiece = (toRow, toCol, captured) => {
    if (!selectedPiece) return;

    const newBoard = [...board].map(row => [...row]);

    // Remove the captured piece if there was a capture
    if (captured) {
        newBoard[captured.row][captured.col] = null;
    }

    // Determine if the piece becomes a king
    const becomesKing = (selectedPiece.player === 1 && toRow === 7) || (selectedPiece.player === 2 && toRow === 0);
    
    // Move the selected piece and update king status if applicable
    newBoard[selectedPiece.row][selectedPiece.col] = null;
    newBoard[toRow][toCol] = { ...selectedPiece, isKing: selectedPiece.isKing || becomesKing };

    setBoard(newBoard);

    // Check for additional captures only if the current move was a capture
    if (captured) {
        const additionalCaptures = getLegalMoves(newBoard[toRow][toCol], toRow, toCol, true);
        if (additionalCaptures.length > 0) {
            setSelectedPiece({ ...newBoard[toRow][toCol], row: toRow, col: toCol });
            setLegalMoves(additionalCaptures);
        } else {
            // End the turn if no further captures are possible
            setSelectedPiece(null);
            setLegalMoves([]);
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }
    } else {
        // End the turn immediately if it was not a capturing move
        setSelectedPiece(null);
        setLegalMoves([]);
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }

    if (checkGameOver()) {
      alert("THE END");
    }
  };

  return { board, selectedPiece, legalMoves, selectPiece, movePiece };
};

export default useBoard;