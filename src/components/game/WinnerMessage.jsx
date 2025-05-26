import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import useUserProfile from "../../hooks/useUserProfile";

const WinnerMessage = ({ player2Name }) => {
  const { gameMode, currentPlayer, lastMove, board } = useGame();
  const { userName } = useUserProfile();
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation effect - delay appearance to sync with confetti
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getWinningPlayer = () => {
    if (!lastMove) return currentPlayer;
    
    const { row, col } = lastMove;
    return board[row][col];
  };
  
  const winningPlayer = getWinningPlayer();
  
  const getWinnerText = () => {
    const player1DisplayName = userName || "Jugador 1";
    const player2DisplayName = player2Name || (gameMode === 'ai' ? "AI" : "Jugador 2");
    
    if (gameMode === 'ai' && winningPlayer === 2) {
      return `¡La IA ha ganado!`;
    } else if (gameMode === 'online') {
      return `¡${winningPlayer === 1 ? 'Tú' : 'Tu oponente'} ha ganado!`;
    } else {
      // Use actual player names - make the name lowercase for better aesthetic
      return `¡${winningPlayer === 1 ? player1DisplayName.toLowerCase() : player2DisplayName.toLowerCase()} ha ganado!`;
    }
  };
  
  // Winner's color for visual association
  const winnerColor = winningPlayer === 1 
    ? 'from-amber-400 via-orange-500 to-red-500' 
    : 'from-blue-400 via-indigo-500 to-violet-500';
  
  return (
    <motion.div 
      className="relative py-4 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Trophy circle at top */}
      <motion.div
        className="absolute -top-12 left-46 z-10"
        initial={{ opacity: 0, scale: 0, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 15 }}
        style={{ transform: 'translateX(-50%)' }}
      >
        <div className="flex items-center justify-center text-4xl bg-yellow-400 p-2 rounded-full shadow-xl border-2 border-yellow-300 h-16 w-16">
          <span>🏆</span>
        </div>
      </motion.div>
    
      {/* Winner message banner */}
      <motion.div 
        className={`bg-gradient-to-r ${winnerColor} text-white font-bold py-3 px-8 rounded-lg text-center shadow-lg mt-4`}
        initial={{ opacity: 0, scale: 0.5, y: -20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0.5,
          y: isVisible ? 0 : -20
        }}
        transition={{ 
          type: 'spring',
          stiffness: 300,
          damping: 15,
          delay: 0.5
        }}
      >
        <motion.p 
          className="text-xl tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {getWinnerText()}
        </motion.p>
        
        {/* Animated glow behind the banner */}
        <motion.div
          className="absolute -inset-1 rounded-lg z-[-1]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          style={{ 
            background: `linear-gradient(45deg, ${winningPlayer === 1 ? '#ffdd00, #ff8800' : '#00aaff, #0044ff'})`,
            filter: 'blur(8px)'
          }}
        />
        
        {/* Subtle confetti shapes inside the banner */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-white/20"
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: 0
            }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0.5]
            }}
            transition={{
              duration: 2,
              delay: 0.8 + (i * 0.2),
              repeat: Infinity,
              repeatDelay: Math.random() * 3
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default WinnerMessage;
