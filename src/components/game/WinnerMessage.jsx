import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';

const WinnerMessage = () => {
  const { gameMode, currentPlayer, lastMove, board } = useGame();
  
  const getWinningPlayer = () => {
    if (!lastMove) return currentPlayer;
    
    const { row, col } = lastMove;
    return board[row][col];
  };
  
  const winningPlayer = getWinningPlayer();
  
  const getWinnerText = () => {
    if (gameMode === 'ai' && winningPlayer === 2) {
      return `¡La IA ha ganado!`;
    } else if (gameMode === 'online') {
      return `¡${winningPlayer === 1 ? 'Tú' : 'Tu oponente'} ha ganado!`;
    } else {
      return `¡Jugador ${winningPlayer} ha ganado!`;
    }
  };
  
  return (
    <motion.div 
      className="bg-gradient-to-r from-amber-400 to-pink-500 text-white font-bold py-2 px-4 rounded-lg mb-4 text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring' }}
    >
      {getWinnerText()}
    </motion.div>
  );
};

export default WinnerMessage;
