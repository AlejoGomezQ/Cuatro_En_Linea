import { motion } from 'framer-motion';

const AIThinkingIndicator = ({ isThinking }) => {
  if (!isThinking) return null;
  
  return (
    <motion.div 
      className="flex items-center justify-center space-x-1 mt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <p className="text-sm text-slate-300">IA pensando</p>
      <div className="flex space-x-1">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: dot * 0.2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AIThinkingIndicator;
