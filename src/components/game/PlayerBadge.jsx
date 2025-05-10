import { motion } from 'framer-motion';

const PlayerBadge = ({ player }) => {
  const playerColor = player === 1 ? 'bg-red-500' : 'bg-blue-500';
  const playerName = player === 1 ? 'Jugador 1' : 'Jugador 2';
  
  return (
    <motion.div 
      className={`flex items-center gap-2 mb-2 p-2 px-4 rounded-full ${playerColor} text-white shadow-md`}
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-5 h-5 rounded-full bg-white shadow-inner"></div>
      <span className="font-bold text-sm md:text-base">{playerName}</span>
    </motion.div>
  );
};

export default PlayerBadge;