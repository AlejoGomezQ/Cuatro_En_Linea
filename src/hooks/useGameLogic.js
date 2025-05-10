import { useState, useCallback } from "react";

const BOARD_COLS = 7;
const BOARD_ROWS = 6;

const checkWinner = (board) => {
  // Verificar horizontal
  for (let row = 0; row < BOARD_ROWS; row++) {
    for (let col = 0; col <= BOARD_COLS - 4; col++) {
      const player = board[row][col];
      if (player !== 0 && 
          player === board[row][col + 1] && 
          player === board[row][col + 2] && 
          player === board[row][col + 3]) {
        return { 
          winner: player, 
          cells: [[row, col], [row, col + 1], [row, col + 2], [row, col + 3]] 
        };
      }
    }
  }

  // Verificar vertical
  for (let row = 0; row <= BOARD_ROWS - 4; row++) {
    for (let col = 0; col < BOARD_COLS; col++) {
      const player = board[row][col];
      if (player !== 0 && 
          player === board[row + 1][col] && 
          player === board[row + 2][col] && 
          player === board[row + 3][col]) {
        return { 
          winner: player, 
          cells: [[row, col], [row + 1, col], [row + 2, col], [row + 3, col]] 
        };
      }
    }
  }

  // Verificar diagonal (abajo-derecha)
  for (let row = 0; row <= BOARD_ROWS - 4; row++) {
    for (let col = 0; col <= BOARD_COLS - 4; col++) {
      const player = board[row][col];
      if (player !== 0 && 
          player === board[row + 1][col + 1] && 
          player === board[row + 2][col + 2] && 
          player === board[row + 3][col + 3]) {
        return { 
          winner: player, 
          cells: [[row, col], [row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3]] 
        };
      }
    }
  }

  // Verificar diagonal (arriba-derecha)
  for (let row = 3; row < BOARD_ROWS; row++) {
    for (let col = 0; col <= BOARD_COLS - 4; col++) {
      const player = board[row][col];
      if (player !== 0 && 
          player === board[row - 1][col + 1] && 
          player === board[row - 2][col + 2] && 
          player === board[row - 3][col + 3]) {
        return { 
          winner: player, 
          cells: [[row, col], [row - 1, col + 1], [row - 2, col + 2], [row - 3, col + 3]] 
        };
      }
    }
  }

  // No hay ganador
  return null;
};

const useGameLogic = () => {
  const [board, setBoard] = useState(
    Array(BOARD_ROWS)
      .fill()
      .map(() => Array(BOARD_COLS).fill(0))
  );
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameStatus, setGameStatus] = useState("playing");

  const makeMove = useCallback(
    (col) => {
      setBoard((prev) => {
        const newBoard = [...prev];
        const row = newBoard.findIndex((row) => row[col] === 0);
        if (row === -1) return prev;

        newBoard[row][col] = currentPlayer;
        
        // Verificar ganador después de actualizar el tablero
        const result = checkWinner(newBoard);
        if (result) {
          setTimeout(() => setGameStatus("won"), 100);
        } else {
          setTimeout(() => setCurrentPlayer((prev) => (prev === 1 ? 2 : 1)), 100);
        }
        
        return newBoard;
      });
    },
    [currentPlayer]
  );

  const resetGame = () => {
    setBoard(
      Array(BOARD_ROWS)
        .fill()
        .map(() => Array(BOARD_COLS).fill(0))
    );
    setCurrentPlayer(1);
    setGameStatus("playing");
  };

  return { board, currentPlayer, gameStatus, makeMove, resetGame };
};

export default useGameLogic;
