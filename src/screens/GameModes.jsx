import { motion } from 'framer-motion';
import { useState } from 'react';
import GameModeCard from '../components/game/GameModeCard';

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
      disabled: false
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
