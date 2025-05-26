import { motion } from 'framer-motion';
import '../../styles/animations.css';
import { useState, useEffect } from 'react';

const Cell = ({ player, isWinner, onClick, isInteractive, rowIndex, colIndex }) => {
    const [justAdded, setJustAdded] = useState(false);
    
    // Detect when a piece is newly added to trigger animation
    useEffect(() => {
        if (player !== 0) {
            setJustAdded(true);
            const timer = setTimeout(() => setJustAdded(false), 700);
            return () => clearTimeout(timer);
        }
    }, [player]);
    
    // Cell styling based on state
    const cellClass = isWinner 
        ? "celda-ganadora" 
        : justAdded 
            ? "celda-nueva" 
            : player === 1 
                ? "celda-jugador1" 
                : player === 2 
                    ? "celda-jugador2" 
                    : "";

    const getCellStyle = () => {
        if (isWinner) return 'bg-gradient-to-br from-yellow-300 to-yellow-500 border-yellow-200';
        if (player === 0) return 'bg-slate-700/80 border-slate-600/50 hover:border-slate-400/50';
        return player === 1 
            ? 'bg-gradient-to-br from-amber-400 to-red-600 border-amber-300/70' 
            : 'bg-gradient-to-br from-blue-400 to-indigo-600 border-blue-300/70';
    };

    // Enhanced hover animation
    const hoverAnimation = isInteractive && player === 0 ? {
        y: [0, -7, 0],
        scale: [1, 1.05, 1],
        transition: { duration: 0.6, ease: "easeInOut" }
    } : {};

    return (
        <motion.button
            onClick={onClick}
            disabled={!isInteractive || player !== 0}
            className={`w-9 h-9 md:w-11 md:h-11 rounded-full ${getCellStyle()} 
                ${isInteractive && player === 0 ? 'cursor-pointer' : ''} 
                shadow-lg border-2 relative overflow-hidden ${cellClass}`}
            initial={{ scale: player === 0 ? 1 : 0 }}
            animate={{ 
                scale: player === 0 ? 1 : 1,
                rotate: isWinner ? [0, 5, -5, 5, -5, 0] : 0
            }}
            transition={{ 
                type: 'spring', 
                stiffness: player === 0 ? 100 : 260, 
                damping: player === 0 ? 10 : 20,
                repeat: isWinner ? Infinity : 0,
                repeatDelay: isWinner ? 1 : 0
            }}
            whileHover={hoverAnimation}
            whileTap={{ scale: 0.92 }}
        >
            {player !== 0 && (
                <motion.div 
                    className="absolute inset-1 rounded-full bg-white/20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                />
            )}
            
            {/* Shine effect on pieces */}
            {player !== 0 && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent rounded-full"
                    initial={{ left: "-100%" }}
                    animate={{ left: "100%" }}
                    transition={{ repeat: Infinity, repeatDelay: 3, duration: 1.5 }}
                    style={{ width: "50%", height: "100%" }}
                />
            )}
        </motion.button>
    );
};

export default Cell;