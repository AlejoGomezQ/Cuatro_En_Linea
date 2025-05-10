import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PlayerBadge from '../components/game/PlayerBadge';
import useGameSounds from '../hooks/useGameSounds';
import Cell from '../components/game/Cell';
import useGameLogic from '../hooks/useGameLogic';

const GameScreen = ({ gameMode }) => {
    const { board, currentPlayer, gameStatus, makeMove, resetGame } = useGameLogic();
    const { playMoveSound, playWinSound } = useGameSounds();

    useEffect(() => {
        if (gameStatus === 'won') playWinSound();
    }, [gameStatus]);

    const handleMove = (col) => {
        if (gameStatus !== 'playing') return;
        makeMove(col);
        playMoveSound();
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4">
            <div className="flex justify-between items-center w-full max-w-md mb-4">
                <PlayerBadge 
                    player={1} 
                    isActive={currentPlayer === 1 && gameStatus === 'playing'} 
                />
                <PlayerBadge 
                    player={2} 
                    isActive={currentPlayer === 2 && gameStatus === 'playing'} 
                />
            </div>
            
            <motion.div 
                className="bg-slate-800/80 backdrop-blur-md rounded-xl p-4 shadow-xl border border-slate-700/50 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {gameStatus === 'won' && (
                    <motion.div 
                        className="bg-gradient-to-r from-amber-400 to-pink-500 text-white font-bold py-2 px-4 rounded-lg mb-4 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring' }}
                    >
                        ¡Jugador {currentPlayer === 1 ? 2 : 1} ha ganado!
                    </motion.div>
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
                
                {gameStatus === 'won' && (
                    <motion.button
                        className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg shadow-lg border-2 border-emerald-300/30 font-bold tracking-wide w-full"
                        onClick={resetGame}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Jugar de nuevo
                    </motion.button>
                )}
                
                {gameStatus === 'playing' && (
                    <motion.div 
                        className="mt-4 text-white/80 text-center text-sm bg-white/10 py-2 px-4 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Selecciona una columna para colocar tu ficha
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default GameScreen;