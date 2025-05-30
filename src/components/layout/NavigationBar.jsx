import { motion } from 'framer-motion';
import { useGameReset } from '../../context/GameContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const NavigationButton = ({ onClick, icon, ariaLabel }) => (
  <motion.button
    className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-all"
    onClick={onClick}
    whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05 }}
    aria-label={ariaLabel}
  >
    {icon}
  </motion.button>
);

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1v-7m-6 0a1 1 0 00-1 1v3" />
  </svg>
);

const NavigationBar = ({ showBackButton, onBackClick, onMenuClick }) => {
  const resetGameAndData = useGameReset();
  const navigate = useNavigate();

  const clearGameStorage = () => {
    localStorage.removeItem('player2Name');
    localStorage.removeItem('hasNameBeenSet');
  };

  const handleBackClick = () => {
    Swal.fire({
      title: "¿Estás seguro que deseas salir?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, volver",
      cancelButtonText: "No",
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#a21caf",
      background: "linear-gradient(90deg, #3730a3 0%, #a21caf 100%)",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        resetGameAndData();
        clearGameStorage();
        
        Swal.fire({
          title: "¡Has regresado correctamente!",
          text: "¡Vuelve Pronto!",
          icon: "success",
          showConfirmButton: false,         
          timer: 1500,                      
          background: "linear-gradient(90deg, #3730a3 0%, #a21caf 100%)", 
          color: "#fff",
        }).then(() => {
          if (onBackClick) {
            onBackClick();
          }
        });
      }
    });
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-800/80 to-purple-800/80 backdrop-blur-md z-30 border-t border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {showBackButton ? (
        <>
          <NavigationButton 
            onClick={handleBackClick} 
            icon={<BackIcon />} 
            ariaLabel="Volver atrás" 
          />
          
          <div className="w-12"></div>
          
          <NavigationButton 
            onClick={onMenuClick} 
            icon={<HomeIcon />} 
            ariaLabel="Inicio" 
          />
        </>
      ) : (
        <>
          <div className="w-12"></div>
          
          <NavigationButton 
            onClick={onMenuClick} 
            icon={<HomeIcon />} 
            ariaLabel="Inicio" 
          />
          
          <div className="w-12"></div>
        </>
      )}
    </motion.div>
  );
};

export default NavigationBar;
