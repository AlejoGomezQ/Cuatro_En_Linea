import { motion } from 'framer-motion';

const AppHeader = () => {
  return (
    <motion.header 
      className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-800/80 to-purple-800/80 backdrop-blur-md rounded-xl mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h1 
        className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500"
      >
        Konect4
      </motion.h1>
    </motion.header>
  );
};

export default AppHeader;
