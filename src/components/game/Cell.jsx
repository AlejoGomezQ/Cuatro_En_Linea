import { motion } from 'framer-motion';

const Cell = ({ player, isWinner, onClick, isInteractive }) => {
    const getColor = () => {
        if (isWinner) return 'bg-yellow-400';
        if (player === 0) return 'bg-slate-600'; // Celda vacía
        return player === 1 ? 'bg-red-500' : 'bg-blue-500';
    };

    return (
        <motion.button
            onClick={onClick}
            disabled={!isInteractive || player !== 0}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${getColor()} ${isInteractive && player === 0 ? 'cursor-pointer hover:opacity-80 active:scale-95' : ''
                } shadow-inner`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            whileTap={{ scale: 0.95 }}
        />
    );
};

export default Cell;