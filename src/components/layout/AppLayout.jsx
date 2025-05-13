import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import AppHeader from './AppHeader';
import NavigationBar from './NavigationBar';
import MenuDrawer from './MenuDrawer';

const AppLayout = () => {
  const { gameMode, aiDifficulty, gameStatus, handleSelectMode, resetGame } = useGame();
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
    if (gameMode === 'ai' && aiDifficulty) {
      handleSelectMode('ai');
    } else {
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
