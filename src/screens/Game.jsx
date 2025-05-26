import { motion } from 'framer-motion';
import { useEffect } from 'react';
import PlayerBadge from '../components/game/PlayerBadge';
import Cell from '../components/game/Cell';
import WinnerMessage from '../components/game/WinnerMessage';
import Button from '../components/ui/Button';
import InfoMessage from '../components/ui/InfoMessage';
import { useGame } from '../context/GameContext';
import { useSound } from '../context/SoundContext'; // Importamos el hook de sonido del contexto

const GameScreen = () => {
    const { board, currentPlayer, gameStatus, makeMove, resetGame } = useGame();
    const { playMoveSound, playWinSound } = useSound(); // Obtenemos las funciones de sonido del contexto

    // Maneja el movimiento y reproduce el sonido
    const handleMove = (col) => {
        if (gameStatus !== 'playing') return;
        
        const moveSuccessful = makeMove(col);
        if (moveSuccessful) {
            playMoveSound(); // Reproducir sonido solo si el movimiento fue válido
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
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4">
            {/* Panel de jugadores */}
            <div className="flex justify-between items-center w-full max-w-md mb-8">
                <PlayerBadge 
                    player={1} 
                    isActive={currentPlayer === 1 && gameStatus === 'playing'} 
                />
                
                <PlayerBadge 
                    player={2} 
                    isActive={currentPlayer === 2 && gameStatus === 'playing'} 
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