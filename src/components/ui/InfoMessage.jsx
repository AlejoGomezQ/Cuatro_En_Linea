import { motion } from 'framer-motion';

const InfoMessage = ({ children }) => {
  return (
    <motion.div 
      className="text-white/80 text-center text-sm bg-white/10 py-2 px-4 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default InfoMessage;
