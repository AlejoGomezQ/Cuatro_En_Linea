import { motion } from 'framer-motion';
import AIThinkingIndicator from './AIThinkingIndicator';
import { useGame } from '../../context/GameContext';

const PlayerBadge = ({ player, isActive, userName, isLoading }) => {
  const { gameMode, isAiThinking } = useGame();
  
  const playerStyles = player === 1 
    ? 'bg-gradient-to-r from-amber-500 to-red-600 border-amber-300' 
    : 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-300';
  
  const isAI = gameMode === 'ai' && player === 2;
  
  // Only show player name when not loading for player 1
  const playerName = player === 1 
    ? (isLoading ? "" : (userName || 'Jugador 1')) 
    : (isAI ? 'IA' : 'Jugador 2');
  
  return (
    <div className="flex flex-col items-center">
      <motion.div 
        className={`flex items-center justify-center gap-3 py-2 px-4 rounded-full ${playerStyles} text-white shadow-lg border-2 backdrop-blur-sm ${isActive ? 'opacity-100 scale-105' : 'opacity-70 scale-95'}`}
        animate={isActive ? { y: [0, -3, 0], scale: [1.05, 1.08, 1.05] } : { scale: 0.95 }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="w-5 h-5 rounded-full bg-white shadow-inner flex items-center justify-center">
          <div className={`w-3 h-3 rounded-full ${player === 1 ? 'bg-red-500' : 'bg-blue-500'}`}></div>
        </div>
        {player === 1 && isLoading ? (
          <span className="font-bold text-sm md:text-base tracking-wide min-w-[80px] text-center">
            <span className="animate-pulse">•••</span>
          </span>
        ) : (
          <span className="font-bold text-sm md:text-base tracking-wide">{playerName}</span>
        )}
        {isAI && (
          <motion.div 
            className="ml-1 text-lg"
            animate={{ rotate: isActive ? [0, 360] : 0 }}
            transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: "linear" }}
          >
            🤖
          </motion.div>
        )}
      </motion.div>
      {isAI && isActive && <AIThinkingIndicator isThinking={isAiThinking} />}
    </div>
  );
};

export default PlayerBadge;