import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import AppHeader from './AppHeader';
import NavigationBar from './NavigationBar';
import MenuDrawer from './MenuDrawer';
import GameScreen from '../../screens/Game';
import GameModesScreen from '../../screens/GameModes';
import DifficultySelector from '../game/DifficultySelector';

const AppLayout = () => {
  const { 
    gameMode, 
    aiDifficulty, 
    gameStatus, 
    handleSelectMode, 
    resetGame, 
    handleSelectDifficulty 
  } = useGame();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const showBackButton = gameMode !== null;
  
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [drawerOpen]);
  
  const handleBack = () => {
    console.log('Botón volver presionado:', { gameMode, aiDifficulty });
    
    if (gameMode === 'ai' && aiDifficulty) {
      // Si estamos en el juego contra IA con dificultad seleccionada,
      // volvemos a la selección de dificultad
      handleSelectDifficulty(null);
      handleSelectMode('ai');
    } else {
      // En cualquier otro caso, volvemos a la selección de modos
      handleSelectMode(null);
    }
  };
  
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleMenuOption = (option) => {
    switch (option) {
      case 'restart':
        resetGame();
        break;
      default:
        break;
    }
    setDrawerOpen(false);
  };
  
  return (
    <>
      <AppHeader />
      
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
      
      <NavigationBar 
        showBackButton={showBackButton}
        onBackClick={handleBack}
        onMenuClick={toggleDrawer}
      />
      
      <MenuDrawer 
        isOpen={drawerOpen}
        onClose={toggleDrawer}
        onMenuOptionClick={handleMenuOption}
        showRestartOption={gameMode && gameStatus !== 'won'}
      />
      
      
    </>
  );
};

export default AppLayout;
