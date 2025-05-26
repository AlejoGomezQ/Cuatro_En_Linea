import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { BOARD_COLUMNS, BOARD_ROWS, checkWinner } from '../utils/gameUtils';
import { getAIMove } from '../utils/aiUtils';
import { useSound } from './SoundContext'; // Cambiado de useGameSounds a useSound

const GameContext = createContext();

const createEmptyBoard = () => (
  Array(BOARD_ROWS)
    .fill()
    .map(() => Array(BOARD_COLUMNS).fill(0))
);

export const useGameReset = () => {
  const { resetGame } = useGame();
  const resetGameAndData = () => {
    resetGame();
    // Add any other reset functionality needed
  };
  
  return resetGameAndData;
};

export const GameProvider = ({ children }) => {
  const [gameBoard, setGameBoard] = useState(createEmptyBoard());
  const [activePlayer, setActivePlayer] = useState(1);
  const [gameStatus, setGameStatus] = useState('playing');
  const [lastMove, setLastMove] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [aiDifficulty, setAiDifficulty] = useState(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const { playMoveSound, playWinSound } = useSound();

  const handleSelectMode = useCallback((mode) => {
    setGameMode(mode);
    if (mode !== 'ai') {
      setAiDifficulty(null);
    }
  }, []);

  const handleSelectDifficulty = useCallback((difficulty) => {
    setAiDifficulty(difficulty);
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
    setIsAiThinking(false);
  }, []);


  useEffect(() => {
    if (gameMode === 'ai' && aiDifficulty && activePlayer === 2 && gameStatus === 'playing') {
      setIsAiThinking(true);
      

      let thinkingTime;
      switch (aiDifficulty) {
        case 'easy':
          thinkingTime = Math.random() * 200 + 200; // 200-400ms
          break;
        case 'medium':
          thinkingTime = Math.random() * 300 + 300; // 300-600ms
          break;
        case 'hard':
          thinkingTime = Math.random() * 400 + 400; // 400-800ms
          break;
        default:
          thinkingTime = Math.random() * 300 + 200; // 200-500ms
      }
      
      const aiTimeout = setTimeout(() => {

        const aiColumn = getAIMove(gameBoard, aiDifficulty);
        
        if (aiColumn !== null) {
          makeMove(aiColumn);
        }
        setIsAiThinking(false);
      }, thinkingTime);
      
      return () => clearTimeout(aiTimeout);
    }
  }, [activePlayer, gameMode, aiDifficulty, gameStatus, gameBoard, makeMove]);

  const value = {
    board: gameBoard,
    currentPlayer: activePlayer,
    gameStatus,
    lastMove,
    gameMode,
    aiDifficulty,
    isAiThinking,
    makeMove,
    resetGame,
    handleSelectMode,
    handleSelectDifficulty
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
