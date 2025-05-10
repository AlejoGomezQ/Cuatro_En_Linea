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
        <div className="flex flex-col items-center p-2 max-w-md mx-auto">
            <PlayerBadge player={currentPlayer} />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-7 gap-1 bg-slate-800 p-3 rounded-lg mt-2 shadow-lg"
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

            {gameStatus === 'won' && (
                <motion.button
                    onClick={resetGame}
                    className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Jugar de nuevo
                </motion.button>
            )}
        </div>
    );
};

export default GameScreen;