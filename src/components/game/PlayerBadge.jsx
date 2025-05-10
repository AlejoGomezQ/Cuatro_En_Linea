import { motion } from 'framer-motion';

const PlayerBadge = ({ player }) => {
  const playerStyles = player === 1 
    ? 'bg-gradient-to-r from-amber-500 to-red-600 border-amber-300' 
    : 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-300';
  const playerName = player === 1 ? 'Jugador 1' : 'Jugador 2';
  
  return (
    <motion.div 
      className={`flex items-center justify-center gap-3 mb-4 py-2 px-5 rounded-full ${playerStyles} text-white shadow-lg border-2 backdrop-blur-sm`}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-6 h-6 rounded-full bg-white shadow-inner flex items-center justify-center">
        <div className={`w-4 h-4 rounded-full ${player === 1 ? 'bg-red-500' : 'bg-blue-500'}`}></div>
      </div>
      <span className="font-bold text-base md:text-lg tracking-wide">{playerName}</span>
    </motion.div>
  );
};

export default PlayerBadge;