import { motion, AnimatePresence } from 'framer-motion';

const MenuItem = ({ onClick, icon, title, description, disabled = false }) => (
  <li>
    <button 
      className={`w-full text-left p-4 text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={disabled ? undefined : onClick}
    >
      {icon}
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-white/70">{description}</p>
      </div>
    </button>
  </li>
);

const MenuDrawer = ({ isOpen, onClose, onMenuOptionClick, showRestartOption }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-gradient-to-b from-indigo-900 to-purple-900 z-50 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">Menú</h2>
            <button 
              className="w-10 h-10 flex items-center justify-center text-white rounded-full bg-white/10 hover:bg-white/20"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-4">
              {showRestartOption && (
                <MenuItem 
                  onClick={() => onMenuOptionClick('restart')}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  }
                  title="Reiniciar juego"
                  description="Comenzar una nueva partida"
                />
              )}
              
              <MenuItem 
                disabled={true}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                title="Cómo jugar"
                description="Próximamente"
              />
              
              <MenuItem 
                onClick={() => onMenuOptionClick('about')}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Acerca de"
                description="Información sobre Konect4"
              />
            </ul>
          </div>
          
          <div className="p-6 border-t border-white/10 text-center">
            <p className="text-white/50">© 2025 Konect4</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuDrawer;
