import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', fullWidth = false }) => {
  const getVariantStyles = () => {
    const variants = {
      primary: 'bg-gradient-to-r from-emerald-500 to-teal-600 border-emerald-300/30',
      secondary: 'bg-gradient-to-r from-indigo-500 to-purple-600 border-indigo-300/30',
      danger: 'bg-gradient-to-r from-red-500 to-pink-600 border-red-300/30'
    };
    
    return variants[variant] || variants.primary;
  };
  
  return (
    <motion.button
      className={`${getVariantStyles()} text-white px-6 py-3 rounded-lg shadow-lg border-2 font-bold tracking-wide ${fullWidth ? 'w-full' : ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
