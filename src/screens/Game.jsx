import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PlayerBadge from "../components/game/PlayerBadge";
import Cell from "../components/game/Cell";
import WinnerMessage from "../components/game/WinnerMessage";
import Button from "../components/ui/Button";
import InfoMessage from "../components/ui/InfoMessage";
import { useGame } from "../context/GameContext";
import { useSound } from "../context/SoundContext";
import useUserProfile from "../hooks/useUserProfile";
import Confetti from "../components/game/Confetti";
import ColumnHighlight from "../components/game/ColumnHighlight";
import WinLine from "../components/game/WinLine";
import MenuDrawer from "../components/layout/MenuDrawer";

const GameScreen = () => {
  // Get location to check for state parameters from navigation
  const location = useLocation();
  
  const {
    board,
    currentPlayer,
    gameStatus,
    makeMove,
    resetGame,
    gameMode,
    winningCells,
  } = useGame();
  const { playMoveSound, playWinSound } = useSound();
  const { userName, isLoading } = useUserProfile();

  // State for player 2's name and UI states - initialize from localStorage
  const [player2Name, setPlayer2Name] = useState(() => {
    return localStorage.getItem('player2Name') || "";
  });
  const [hasNameBeenSet, setHasNameBeenSet] = useState(() => {
    return localStorage.getItem('hasNameBeenSet') === 'true';
  });
  const [showNameInput, setShowNameInput] = useState(false);
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [cellSize, setCellSize] = useState(44);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Show name input only when game starts in local mode AND name hasn't been set yet
  useEffect(() => {
    if (gameStatus === "playing" && !player2Name && gameMode !== "ai" && !hasNameBeenSet) {
      setShowNameInput(true);
    }
  }, [gameStatus, player2Name, gameMode, hasNameBeenSet]);

  // Store player2Name in localStorage when it changes
  useEffect(() => {
    if (player2Name) {
      localStorage.setItem('player2Name', player2Name);
    }
  }, [player2Name]);

  // Reset game function
  const handleResetGame = () => {
    resetGame();
  };

  // In the name input modal's button onClick:
  const handleSetPlayerName = () => {
    // Default to "Jugador 2" if empty
    if (!player2Name.trim()) {
      setPlayer2Name("Jugador 2");
    }
    setShowNameInput(false);
    setHasNameBeenSet(true);
    localStorage.setItem('hasNameBeenSet', 'true');
  };

  // Check if we should open the menu when component mounts or on location change
  useEffect(() => {
    if (location.state?.openMenuDrawer) {
      setIsMenuOpen(true);
      // Clear the state to prevent reopening on future renders
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Handle cell size for responsive win line
  useEffect(() => {
    const updateCellSize = () => {
      // Adjust based on your actual cell sizes
      setCellSize(window.innerWidth < 768 ? 36 : 44);
    };
    
    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, []);

  // Handle column hover for preview effect
  const handleColumnHover = (col) => {
    if (gameStatus === "playing") {
      setHoveredColumn(col);
    }
  };
  
  const handleColumnLeave = () => {
    setHoveredColumn(null);
  };

  // Handle game moves with enhanced feedback
  const handleMove = (col) => {
    if (gameStatus !== "playing") return;

    const moveSuccessful = makeMove(col);
    if (moveSuccessful) {
      // Play a more realistic drop sound
      playMoveSound();
      
      // If it's the AI's turn, add a slight delay before their move
      if (gameMode === "ai" && currentPlayer === 2) {
        setTimeout(() => {
          // AI logic here
        }, 600); // Match this with animation duration
      }
    }
  };

  // Handle winning game state with effects
  useEffect(() => {
    if (gameStatus === "won") {
      playWinSound();
      setShowConfetti(true);
      
      // Hide confetti after a while
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [gameStatus, playWinSound]);

  // Add functions to handle menu open/close
  const handleOpenMenu = () => setIsMenuOpen(true);
  const handleCloseMenu = () => setIsMenuOpen(false);
  const handleMenuOptionClick = (option) => {
    if (option === 'restart') {
      handleResetGame();
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      {/* Add the MenuDrawer component */}
      <MenuDrawer 
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        onMenuOptionClick={handleMenuOptionClick}
        showRestartOption={true}
      />
      
      {/* Show confetti when winning */}
      <AnimatePresence>
        {showConfetti && gameStatus === "won" && <Confetti />}
      </AnimatePresence>

      {/* Player 2 name input modal */}
      {showNameInput && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <motion.div 
            className="bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700 w-80"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white text-lg font-bold mb-4">Nombre del Jugador 2</h3>
            <input 
              type="text"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              placeholder="Ingresa un nombre"
              className="w-full p-2 mb-4 bg-slate-700 text-white rounded border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              autoFocus
              maxLength={15} // Prevent extremely long names
            />
            <Button 
              onClick={handleSetPlayerName}
              fullWidth={true}
            >
              Comenzar juego
            </Button>
          </motion.div>
        </div>
      )}

      {/* Panel de jugadores */}
      <div className="flex justify-between items-center w-full max-w-md mb-8">
        <PlayerBadge
          player={1}
          isActive={currentPlayer === 1 && gameStatus === "playing"}
          userName={userName}
          isLoading={isLoading}
        />

        <PlayerBadge
          player={2}
          isActive={currentPlayer === 2 && gameStatus === "playing"}
          userName={player2Name || (gameMode === "ai" ? "AI" : "Jugador 2")}
        />
      </div>

      {/* Tablero de juego */}
      <motion.div
        className="bg-slate-800/80 backdrop-blur-md rounded-xl p-4 shadow-xl border border-slate-700/50 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {gameStatus === "won" && <WinnerMessage player2Name={player2Name} />}

        <div 
          className="grid grid-cols-7 gap-1 md:gap-2 bg-slate-900/80 p-2 md:p-3 rounded-lg relative"
          onMouseLeave={handleColumnLeave}
        >
          {/* Win line visualization */}
          <WinLine winningCells={winningCells} cellSize={cellSize} />
          
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className="relative"
                onMouseEnter={() => handleColumnHover(colIndex)}
              >
                {/* Column highlight on hover */}
                {hoveredColumn === colIndex && rowIndex === 0 && (
                  <ColumnHighlight 
                    isVisible={hoveredColumn === colIndex && gameStatus === "playing"} 
                    player={currentPlayer}
                  />
                )}
                
                <Cell
                  player={cell}
                  onClick={() => handleMove(colIndex)}
                  isInteractive={gameStatus === "playing"}
                  isWinner={winningCells?.some(
                    ([r, c]) => r === rowIndex && c === colIndex
                  )}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                />
              </div>
            ))
          )}

            
        </div>

        {/* Botón para jugar de nuevo cuando se gana */}
        {gameStatus === "won" && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Button onClick={handleResetGame} fullWidth={true}>
              Jugar de nuevo
            </Button>
          </motion.div>
        )}

        {/* Mensaje informativo durante el juego */}
        {gameStatus === "playing" && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <InfoMessage>
              Selecciona una columna para colocar tu ficha
            </InfoMessage>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GameScreen;
