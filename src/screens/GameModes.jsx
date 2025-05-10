import { motion } from 'framer-motion';
import { useState } from 'react';

const GameModeCard = ({ title, description, icon, onClick, disabled }) => {
  return (
    <motion.div
      className={`bg-slate-800/80 backdrop-blur-md rounded-xl p-5 border border-slate-700/50 w-full mb-4 
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:border-slate-500/50'}`}
      whileHover={!disabled ? { scale: 1.03, y: -5 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={!disabled ? onClick : undefined}
    >
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-slate-300 text-sm">{description}</p>
          {disabled && (
            <span className="text-xs text-amber-400 mt-1 inline-block">Próximamente</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const GameModesScreen = ({ onSelectMode }) => {
  const [selectedMode, setSelectedMode] = useState(null);

  const handleSelectMode = (mode) => {
    setSelectedMode(mode);
    setTimeout(() => onSelectMode(mode), 300);
  };

  const gameModes = [
    {
      id: 'local',
      title: 'Duelo Local',
      description: 'Juega contra un amigo en el mismo dispositivo',
      icon: '👥',
      disabled: false
    },
    {
      id: 'ai',
      title: 'Desafío IA',
      description: 'Enfrenta a la inteligencia artificial',
      icon: '🤖',
      disabled: true
    },
    {
      id: 'online',
      title: 'Multijugador Online',
      description: 'Juega con amigos en diferentes dispositivos',
      icon: '🌐',
      disabled: true
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

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 mb-2">
          Elige un Modo de Juego
        </h2>
        <p className="text-slate-300">Selecciona cómo quieres jugar Konect4</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {gameModes.map((mode) => (
          <GameModeCard
            key={mode.id}
            title={mode.title}
            description={mode.description}
            icon={mode.icon}
            disabled={mode.disabled}
            onClick={() => handleSelectMode(mode.id)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default GameModesScreen;
