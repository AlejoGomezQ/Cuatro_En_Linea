import { motion } from 'framer-motion';

const Cell = ({ player, isWinner, onClick, isInteractive }) => {
    const getCellStyle = () => {
        if (isWinner) return 'bg-gradient-to-br from-yellow-300 to-yellow-500 border-yellow-200';
        if (player === 0) return 'bg-slate-700/80 border-slate-600/50 hover:border-slate-400/50'; // Celda vacía
        return player === 1 
            ? 'bg-gradient-to-br from-amber-400 to-red-600 border-amber-300/70' 
            : 'bg-gradient-to-br from-blue-400 to-indigo-600 border-blue-300/70';
    };

    const hoverAnimation = isInteractive && player === 0 ? {
        y: [0, -5, 0],
        transition: { duration: 0.5 }
    } : {};

    return (
        <motion.button
            onClick={onClick}
            disabled={!isInteractive || player !== 0}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${getCellStyle()} 
                ${isInteractive && player === 0 ? 'cursor-pointer' : ''} 
                shadow-lg border-2 relative overflow-hidden`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
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
        </motion.button>
    );
};

export default Cell;