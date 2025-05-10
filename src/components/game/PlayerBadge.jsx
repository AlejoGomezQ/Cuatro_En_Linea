import { motion } from 'framer-motion';

const PlayerBadge = ({ player, isActive }) => {
  const playerStyles = player === 1 
    ? 'bg-gradient-to-r from-amber-500 to-red-600 border-amber-300' 
    : 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-300';
  const playerName = player === 1 ? 'Jugador 1' : 'Jugador 2';
  
  return (
    <motion.div 
      className={`flex items-center justify-center gap-3 py-2 px-4 rounded-full ${playerStyles} text-white shadow-lg border-2 backdrop-blur-sm ${isActive ? 'opacity-100 scale-105' : 'opacity-70 scale-95'}`}
      animate={isActive ? { y: [0, -3, 0], scale: [1.05, 1.08, 1.05] } : { scale: 0.95 }}
      transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-5 h-5 rounded-full bg-white shadow-inner flex items-center justify-center">
        <div className={`w-3 h-3 rounded-full ${player === 1 ? 'bg-red-500' : 'bg-blue-500'}`}></div>
      </div>
      <span className="font-bold text-sm md:text-base tracking-wide">{playerName}</span>
    </motion.div>
  );
};

export default PlayerBadge;