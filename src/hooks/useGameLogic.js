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
      setGameBoard(prevBoard => {
        const isColumnFull = prevBoard.every(boardRow => boardRow[selectedColumn] !== 0);
        if (isColumnFull) return prevBoard;
        
        const targetRow = prevBoard.findIndex(boardRow => boardRow[selectedColumn] === 0);
        if (targetRow === -1) return prevBoard;
        
        const updatedBoard = prevBoard.map(boardRow => [...boardRow]);
        updatedBoard[targetRow][selectedColumn] = activePlayer;
        
        const winResult = checkWinner(updatedBoard, targetRow, selectedColumn);
        
        setTimeout(() => {
          if (winResult) {
            setGameStatus("won");
          } else {
            setActivePlayer(prevPlayer => prevPlayer === 1 ? 2 : 1);
          }
        }, 0);
        
        return updatedBoard;
      });
    },
    [activePlayer]
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
