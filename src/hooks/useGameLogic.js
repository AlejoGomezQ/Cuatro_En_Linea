import { useState, useCallback } from "react";

const BOARD_COLS = 7;
const BOARD_ROWS = 6;

// Función optimizada para verificar ganador con complejidad O(1)
// Solo verifica las líneas que pasan por la última ficha colocada
const checkWinner = (board, lastRow, lastCol) => {
  // Si no se proporciona la última posición, no hay nada que verificar
  if (lastRow === undefined || lastCol === undefined) return null;
  
  const player = board[lastRow][lastCol];
  if (player === 0) return null; // Si la celda está vacía, no hay ganador

  // Verificar horizontal (izquierda a derecha)
  let count = 0;
  let cells = [];
  for (let c = Math.max(0, lastCol - 3); c <= Math.min(BOARD_COLS - 1, lastCol + 3); c++) {
    if (board[lastRow][c] === player) {
      count++;
      cells.push([lastRow, c]);
      if (count >= 4) return { winner: player, cells: cells.slice(-4) };
    } else {
      count = 0;
      cells = [];
    }
  }

  // Verificar vertical (abajo a arriba)
  count = 0;
  cells = [];
  for (let r = Math.max(0, lastRow - 3); r <= Math.min(BOARD_ROWS - 1, lastRow + 3); r++) {
    if (board[r][lastCol] === player) {
      count++;
      cells.push([r, lastCol]);
      if (count >= 4) return { winner: player, cells: cells.slice(-4) };
    } else {
      count = 0;
      cells = [];
    }
  }

  // Verificar diagonal principal (\)
  count = 0;
  cells = [];
  // Encontrar el punto más arriba a la izquierda de la diagonal que pasa por (lastRow, lastCol)
  let r = lastRow - Math.min(lastRow, lastCol);
  let c = lastCol - Math.min(lastRow, lastCol);
  // Recorrer la diagonal
  while (r < BOARD_ROWS && c < BOARD_COLS) {
    if (board[r][c] === player) {
      count++;
      cells.push([r, c]);
      if (count >= 4) return { winner: player, cells: cells.slice(-4) };
    } else {
      count = 0;
      cells = [];
    }
    r++;
    c++;
  }

  // Verificar diagonal secundaria (/)
  count = 0;
  cells = [];
  // Encontrar el punto más abajo a la izquierda de la diagonal que pasa por (lastRow, lastCol)
  r = lastRow + Math.min(BOARD_ROWS - 1 - lastRow, lastCol);
  c = lastCol - Math.min(BOARD_ROWS - 1 - lastRow, lastCol);
  // Recorrer la diagonal
  while (r >= 0 && c < BOARD_COLS) {
    if (board[r][c] === player) {
      count++;
      cells.push([r, c]);
      if (count >= 4) return { winner: player, cells: cells.slice(-4) };
    } else {
      count = 0;
      cells = [];
    }
    r--;
    c++;
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
      // Primero verificamos si la columna está llena
      const columnIsFull = board.every(row => row[col] !== 0);
      if (columnIsFull) return;
      
      // Encontramos la fila donde colocar la ficha (la más baja disponible)
      const row = board.findIndex(row => row[col] === 0);
      if (row === -1) return;
      
      // Creamos una copia profunda del tablero
      const newBoard = board.map(row => [...row]);
      
      // Colocamos la ficha del jugador actual
      newBoard[row][col] = currentPlayer;
      
      // Actualizamos el tablero
      setBoard(newBoard);
      
      // Verificamos si hay un ganador usando la última posición colocada
      const result = checkWinner(newBoard, row, col);
      
      if (result) {
        // Si hay un ganador, actualizamos el estado del juego
        setGameStatus("won");
      } else {
        // Si no hay ganador, cambiamos al siguiente jugador
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
    },
    [board, currentPlayer]
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
