import { motion } from 'framer-motion';
import GameScreen from '../../screens/Game';
import GameModesScreen from '../../screens/GameModes';
import DifficultySelector from '../game/DifficultySelector';
import AppLayout from './AppLayout';
import { useGame } from '../../context/GameContext';

const GameContainer = () => {
  const { gameMode, aiDifficulty, handleSelectMode, handleSelectDifficulty } = useGame();
  
  return (
    <>
      <AppLayout />
      
      <div className="flex-1 flex items-center justify-center w-full pb-20">
        {!gameMode ? (
          <GameModesScreen onSelectMode={handleSelectMode} />
        ) : gameMode === 'ai' && !aiDifficulty ? (
          <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />
        ) : (
          <div className="w-full">
            <GameScreen />
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
