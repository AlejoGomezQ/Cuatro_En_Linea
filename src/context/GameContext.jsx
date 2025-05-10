import { createContext, useContext, useState, useCallback } from 'react';
import { BOARD_COLUMNS, BOARD_ROWS, checkWinner } from '../utils/gameUtils';
import useGameSounds from '../hooks/useGameSounds';

const GameContext = createContext();

const createEmptyBoard = () => (
  Array(BOARD_ROWS)
    .fill()
    .map(() => Array(BOARD_COLUMNS).fill(0))
);

export const GameProvider = ({ children }) => {
  const [gameBoard, setGameBoard] = useState(createEmptyBoard());
  const [activePlayer, setActivePlayer] = useState(1);
  const [gameStatus, setGameStatus] = useState('playing');
  const [lastMove, setLastMove] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const { playMoveSound, playWinSound } = useGameSounds();

  const handleSelectMode = useCallback((mode) => {
    setGameMode(mode);
  }, []);

  const makeMove = useCallback(
    (selectedColumn) => {
      const isColumnFull = gameBoard.every(row => row[selectedColumn] !== 0);
      if (isColumnFull) return false;

      const emptyRows = gameBoard.map((row, index) => row[selectedColumn] === 0 ? index : -1).filter(index => index !== -1);
      if (emptyRows.length === 0) return false;
      
      const targetRow = Math.max(...emptyRows);

      const updatedBoard = gameBoard.map(row => [...row]);
      updatedBoard[targetRow][selectedColumn] = activePlayer;

      const winResult = checkWinner(updatedBoard, targetRow, selectedColumn);

      setGameBoard(updatedBoard);
      setLastMove({ row: targetRow, col: selectedColumn });
      playMoveSound();
      
      if (winResult) {
        setGameStatus('won');
        playWinSound();
        return true;
      } else {
        setActivePlayer(activePlayer === 1 ? 2 : 1);
        return true;
      }
    },
    [gameBoard, activePlayer, playMoveSound, playWinSound]
  );

  const resetGame = useCallback(() => {
    setGameBoard(createEmptyBoard());
    setActivePlayer(1);
    setGameStatus('playing');
    setLastMove(null);
  }, []);

  const value = {
    board: gameBoard,
    currentPlayer: activePlayer,
    gameStatus,
    lastMove,
    gameMode,
    makeMove,
    resetGame,
    handleSelectMode
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
