import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';

const Header = () => {
  const { gameMode, aiDifficulty, gameStatus, handleSelectMode, resetGame } = useGame();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const showBackButton = gameMode !== null;
  
  // Efecto para bloquear el scroll cuando el drawer está abierto
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
      // Si estamos en el juego contra IA, volvemos a la selección de dificultad
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
      // Casos futuros: theme, settings, about
      default:
        break;
    }
    setDrawerOpen(false);
  };
  
  return (
    <>
      {/* Header con solo el nombre de la app */}
      <motion.header 
        className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-800/80 to-purple-800/80 backdrop-blur-md rounded-xl mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Título de la aplicación */}
        <motion.h1 
          className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500"
        >
          Konect4
        </motion.h1>
      </motion.header>
      
      {/* Botones de navegación en la parte inferior */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-800/80 to-purple-800/80 backdrop-blur-md z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Cuando estamos en modo de juego, mostramos botón de volver atrás a la izquierda y menú a la derecha */}
        {showBackButton ? (
          <>
            <motion.button
              className="w-12 h-12 flex items-center justify-center text-white rounded-full hover:bg-white/10 transition-colors"
              onClick={handleBack}
              whileTap={{ scale: 0.95 }}
              aria-label="Volver atrás"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <div className="w-12"></div> {/* Espacio vacío en el medio */}
            
            <motion.button
              className="w-12 h-12 flex items-center justify-center text-white rounded-full hover:bg-white/10 transition-colors"
              onClick={toggleDrawer}
              whileTap={{ scale: 0.95 }}
              aria-label="Inicio"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1v-7m-6 0a1 1 0 00-1 1v3" />
              </svg>
            </motion.button>
          </>
        ) : (
          /* En la pantalla de selección de modo, solo mostramos el botón de inicio en el medio */
          <>
            <div className="w-12"></div> {/* Espacio vacío a la izquierda */}
            
            <motion.button
              className="w-12 h-12 flex items-center justify-center text-white rounded-full hover:bg-white/10 transition-colors"
              onClick={toggleDrawer}
              whileTap={{ scale: 0.95 }}
              aria-label="Inicio"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1v-7m-6 0a1 1 0 00-1 1v3" />
              </svg>
            </motion.button>
            
            <div className="w-12"></div> {/* Espacio vacío a la derecha */}
          </>
        )}
      </motion.div>
      
      {/* Drawer de pantalla completa */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div 
            className="fixed inset-0 bg-gradient-to-b from-indigo-900 to-purple-900 z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">Menú</h2>
              <button 
                className="w-10 h-10 flex items-center justify-center text-white rounded-full bg-white/10 hover:bg-white/20"
                onClick={toggleDrawer}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-4">
                {(gameMode && gameStatus !== 'won') && (
                  <li>
                    <button 
                      className="w-full text-left p-4 text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center"
                      onClick={() => handleMenuOption('restart')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <div>
                        <h3 className="font-bold text-lg">Reiniciar juego</h3>
                        <p className="text-sm text-white/70">Comenzar una nueva partida</p>
                      </div>
                    </button>
                  </li>
                )}
                <li>
                  <button 
                    className="w-full text-left p-4 text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center opacity-50 cursor-not-allowed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-lg">Cambiar tema</h3>
                      <p className="text-sm text-white/70">Próximamente</p>
                    </div>
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full text-left p-4 text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center opacity-50 cursor-not-allowed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-lg">Ajustes</h3>
                      <p className="text-sm text-white/70">Próximamente</p>
                    </div>
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full text-left p-4 text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center"
                    onClick={() => handleMenuOption('about')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-lg">Acerca de</h3>
                      <p className="text-sm text-white/70">Información sobre Konect4</p>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="p-6 border-t border-white/10 text-center">
              <p className="text-white/50">© 2025 Konect4</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
