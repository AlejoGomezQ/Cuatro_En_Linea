import { motion } from 'framer-motion';

const WinnerMessage = ({ player }) => {
  return (
    <motion.div 
      className="bg-gradient-to-r from-amber-400 to-pink-500 text-white font-bold py-2 px-4 rounded-lg mb-4 text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring' }}
    >
      ¡Jugador {player} ha ganado!
    </motion.div>
  );
};

export default WinnerMessage;
