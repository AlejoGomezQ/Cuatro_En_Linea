import { motion } from 'framer-motion';
import PlayerBadge from '../components/game/PlayerBadge';
import Cell from '../components/game/Cell';
import WinnerMessage from '../components/game/WinnerMessage';
import Button from '../components/ui/Button';
import InfoMessage from '../components/ui/InfoMessage';
import { useGame } from '../context/GameContext';

const GameScreen = () => {
    const { board, currentPlayer, gameStatus, makeMove, resetGame } = useGame();

    const handleMove = (col) => {
        if (gameStatus !== 'playing') return;
        makeMove(col);
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
                    <WinnerMessage player={currentPlayer === 1 ? 2 : 1} />
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
                    <div className="mt-4">
                        <Button onClick={resetGame} fullWidth={true}>
                            Jugar de nuevo
                        </Button>
                    </div>
                )}
                
                {gameStatus === 'playing' && (
                    <div className="mt-4">
                        <InfoMessage>
                            Selecciona una columna para colocar tu ficha
                        </InfoMessage>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default GameScreen;