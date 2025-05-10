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
        makeMove(col);
        playMoveSound();
    };

    return (
        <div className="flex flex-col items-center">
            <PlayerBadge player={currentPlayer} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-7 gap-x-5 gap-y-4 bg-slate-800/90 p-7 rounded-xl shadow-2xl border border-slate-700/50 backdrop-blur-sm"
                style={{ minWidth: "320px" }}
            >
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
            </motion.div>

            {gameStatus === 'won' ? (
                <motion.div 
                    className="mt-6 mb-2 flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.div 
                        className="text-xl font-bold text-white mb-3 bg-gradient-to-r from-amber-400 to-pink-500 px-6 py-2 rounded-full shadow-lg"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        ¡Ganador: Jugador {board.flat().filter(cell => cell !== 0).pop()}!
                    </motion.div>
                    <motion.button
                        onClick={resetGame}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-lg shadow-lg border-2 border-emerald-300/30 font-bold tracking-wide"
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Jugar de nuevo
                    </motion.button>
                </motion.div>
            ) : (
                <div className="h-24 flex items-center justify-center">
                    <motion.div 
                        className="text-white/80 text-sm mt-4 bg-white/10 px-4 py-2 rounded-lg border border-white/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Selecciona una columna para colocar tu ficha
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default GameScreen;