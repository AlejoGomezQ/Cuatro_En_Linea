import { motion } from 'framer-motion';

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

export default GameModeCard;
