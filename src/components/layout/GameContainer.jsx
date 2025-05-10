import { useState } from 'react';
import { motion } from 'framer-motion';
import GameScreen from '../../screens/Game';
import GameModesScreen from '../../screens/GameModes';

const GameContainer = () => {
  const [gameMode, setGameMode] = useState(null);
  
  const handleSelectMode = (mode) => {
    setGameMode(mode);
  };
  
  return (
    <>
      <motion.h1 
        className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 mt-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Konect4
      </motion.h1>
      
      <div className="flex-1 flex items-center justify-center w-full">
        {!gameMode ? (
          <GameModesScreen onSelectMode={handleSelectMode} />
        ) : (
          <div className="w-full">
            <GameScreen gameMode={gameMode} />
          </div>
        )}
      </div>
      
      <motion.div 
        className="text-xs text-white/50 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        © 2025 Konect4 - Todos los derechos reservados
      </motion.div>
    </>
  );
};

export default GameContainer;
