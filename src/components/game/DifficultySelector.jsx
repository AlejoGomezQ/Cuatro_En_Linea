import { motion } from 'framer-motion';

const DifficultySelector = ({ onSelectDifficulty }) => {
  const difficulties = [
    {
      id: 'easy',
      title: 'Fácil',
      description: 'Para principiantes y jugadores casuales',
      icon: '😊'
    },
    {
      id: 'medium',
      title: 'Intermedio',
      description: 'Para jugadores con experiencia',
      icon: '🧠'
    },
    {
      id: 'hard',
      title: 'Difícil',
      description: 'Para jugadores avanzados',
      icon: '🔥'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 mb-2">
          Elige la Dificultad
        </h2>
        <p className="text-slate-300">¿Qué tan desafiante quieres que sea la IA?</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {difficulties.map((difficulty) => (
          <motion.div
            key={difficulty.id}
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 cursor-pointer hover:bg-white/20 transition-all"
            onClick={() => onSelectDifficulty(difficulty.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <div className="text-4xl mr-4">{difficulty.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                  {difficulty.title}
                </h3>
                <p className="text-sm text-slate-300">{difficulty.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DifficultySelector;
