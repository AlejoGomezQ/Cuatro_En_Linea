import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PlayerBadge from '../components/game/PlayerBadge';
import Cell from '../components/game/Cell';
import WinnerMessage from '../components/game/WinnerMessage';
import Button from '../components/ui/Button';
import InfoMessage from '../components/ui/InfoMessage';
import { useGame } from '../context/GameContext';
import { useSound } from '../context/SoundContext';
import useUserProfile from '../hooks/useUserProfile';


const GameScreen = () => {
    const { board, currentPlayer, gameStatus, makeMove, resetGame, gameMode } = useGame();
    const { playMoveSound, playWinSound } = useSound();
    const { userName, isLoading } = useUserProfile();

    // State for player 2's name
    const [player2Name, setPlayer2Name] = useState("");
    const [showNameInput, setShowNameInput] = useState(false);
  
    // Show name input when game starts in local mode
    useEffect(() => {
        if (gameStatus === 'playing' && !player2Name && gameMode !== 'ai') {
            setShowNameInput(true);
        }
    }, [gameStatus, player2Name, gameMode]);


    // Maneja el movimiento y reproduce el sonido
    const handleMove = (col) => {
        if (gameStatus !== 'playing') return;
        
        const moveSuccessful = makeMove(col);
        if (moveSuccessful) {
            playMoveSound();
        }
    };

    // Efecto para cuando se gana el juego
    useEffect(() => {
        if (gameStatus === 'won') {
            playWinSound();
        }
    }, [gameStatus, playWinSound]);

    
    // Función para reiniciar el juego
    const handleResetGame = () => {
        resetGame();
        // Reset player 2 name when starting a new game
        setPlayer2Name("");
        // The name input will show automatically due to the useEffect
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4">
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
                            onClick={() => {
                                // Default to "Jugador 2" if empty
                                if (!player2Name.trim()) {
                                    setPlayer2Name("Jugador 2");
                                }
                                setShowNameInput(false);
                            }}
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
                    isActive={currentPlayer === 1 && gameStatus === 'playing'}
                    userName={userName}
                    isLoading={isLoading}
                />
                
                <PlayerBadge 
                    player={2} 
                    isActive={currentPlayer === 2 && gameStatus === 'playing'} 
                    userName={player2Name}
                />
            </div>
            
            {/* Tablero de juego */}
            <motion.div 
                className="bg-slate-800/80 backdrop-blur-md rounded-xl p-4 shadow-xl border border-slate-700/50 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {gameStatus === 'won' && (
                    <WinnerMessage />
                )}
                
                <div className="grid grid-cols-7 gap-1 md:gap-2 bg-slate-900/80 p-2 md:p-3 rounded-lg relative">
                    {board.map((row, rowIndex) => (
                        row.map((cell, colIndex) => (
                            <Cell
                                key={`${rowIndex}-${colIndex}`}
                                player={cell}
                                onClick={() => handleMove(colIndex)}
                                isInteractive={gameStatus === 'playing'}
                            />
                        ))
                    ))}
                </div>
                
                {/* Botón para jugar de nuevo cuando se gana */}
                {gameStatus === 'won' && (
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
                {gameStatus === 'playing' && (
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