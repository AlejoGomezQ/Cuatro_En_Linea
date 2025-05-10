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
      const isColumnFull = gameBoard.every(boardRow => boardRow[selectedColumn] !== 0);
      if (isColumnFull) return;
      
      const targetRow = gameBoard.findIndex(boardRow => boardRow[selectedColumn] === 0);
      if (targetRow === -1) return;
      
      const updatedBoard = gameBoard.map(boardRow => [...boardRow]);
      updatedBoard[targetRow][selectedColumn] = activePlayer;
      setGameBoard(updatedBoard);
      
      const winResult = checkWinner(updatedBoard, targetRow, selectedColumn);
      
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
