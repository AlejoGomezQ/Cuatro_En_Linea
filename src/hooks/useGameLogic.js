import { useState, useCallback } from "react";
import { BOARD_COLUMNS, BOARD_ROWS, checkWinner } from "../utils/gameUtils";

const useGameLogic = () => {
  const [gameBoard, setGameBoard] = useState(
    Array(BOARD_ROWS)
      .fill()
      .map(() => Array(BOARD_COLUMNS).fill(0))
  );
  const [activePlayer, setActivePlayer] = useState(1);
  const [gameStatus, setGameStatus] = useState("playing");
  const [lastMove, setLastMove] = useState(null);

  const makeMove = useCallback(
    (selectedColumn) => {
      const isColumnFull = gameBoard.every(row => row[selectedColumn] !== 0);
      if (isColumnFull) return;

      const emptyRows = gameBoard.map((row, index) => row[selectedColumn] === 0 ? index : -1).filter(index => index !== -1);
      if (emptyRows.length === 0) return;
      
      const targetRow = Math.max(...emptyRows);

      const updatedBoard = gameBoard.map(row => [...row]);
      updatedBoard[targetRow][selectedColumn] = activePlayer;

      const winResult = checkWinner(updatedBoard, targetRow, selectedColumn);

      setGameBoard(updatedBoard);
      setLastMove({ row: targetRow, col: selectedColumn });
      
      if (winResult) {
        setGameStatus("won");
      } else {
        setActivePlayer(activePlayer === 1 ? 2 : 1);
      }
    },
    [gameBoard, activePlayer]
  );

  const resetGame = () => {
    setGameBoard(
      Array(BOARD_ROWS)
        .fill()
        .map(() => Array(BOARD_COLUMNS).fill(0))
    );
    setActivePlayer(1);
    setGameStatus("playing");
    setLastMove(null);
  };

  return { board: gameBoard, currentPlayer: activePlayer, gameStatus, makeMove, resetGame, lastMove };
};

export default useGameLogic;
