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

  const makeMove = useCallback(
    (selectedColumn) => {
      const isColumnFull = gameBoard.every(row => row[selectedColumn] !== 0);
      if (isColumnFull) return;

      const targetRow = gameBoard.findIndex(row => row[selectedColumn] === 0);
      if (targetRow === -1) return;

      const updatedBoard = gameBoard.map(row => [...row]);
      updatedBoard[targetRow][selectedColumn] = activePlayer;

      const winResult = checkWinner(updatedBoard, targetRow, selectedColumn);

      setGameBoard(updatedBoard);
      
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
  };

  return { board: gameBoard, currentPlayer: activePlayer, gameStatus, makeMove, resetGame };
};

export default useGameLogic;
