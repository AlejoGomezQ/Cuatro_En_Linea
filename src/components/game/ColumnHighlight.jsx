import { motion } from 'framer-motion';
import '../../styles/animations.css';

const ColumnHighlight = ({ isVisible, player }) => {
  if (!isVisible) return null;
  
  const color = player === 1 
    ? 'rgba(255, 100, 0, 0.15)' 
    : 'rgba(30, 120, 255, 0.15)';
  
  return (
    <motion.div
      className="column-preview"
      style={{ backgroundColor: color }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    />
  );
};

export default ColumnHighlight;