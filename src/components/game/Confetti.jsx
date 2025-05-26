import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../../styles/animations.css';

const Confetti = () => {
  const [confetti, setConfetti] = useState([]);
  
  useEffect(() => {
    // Create more confetti pieces with varied shapes and colors
    const colors = [
      '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', 
      '#ff8800', '#8800ff', '#00ff88', '#ff0088', '#88ff00', '#0088ff'
    ];
    
    const shapes = ['circle', 'square', 'triangle', 'rectangle', 'diamond'];
    const newConfetti = [];
    
    // Create 150 confetti pieces for a more dense effect
    for (let i = 0; i < 300; i++) {
      newConfetti.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 60 - 20}%`, // Start some above the viewport
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 5, // Random delay up to 3 seconds
        duration: 2 + Math.random() * 2, // Random duration between 2-4s
        rotation: Math.random() * 360, // Random initial rotation
        size: 5 + Math.random() * 10, // Random size between 5-15px
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }
    
    setConfetti(newConfetti);
    
    // Clean up confetti after animation ends
    const timer = setTimeout(() => {
      setConfetti([]);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getShapeStyle = (shape) => {
    switch(shape) {
      case 'circle': return { borderRadius: '50%' };
      case 'square': return { borderRadius: '0%' };
      case 'triangle': return { 
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        borderRadius: '0%'
      };
      case 'rectangle': return { 
        width: '6px', 
        height: '12px',
        borderRadius: '2px'
      };
      case 'diamond': return { 
        transform: 'rotate(45deg)',
        borderRadius: '4px'
      };
      default: return { borderRadius: '50%' };
    }
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="confeti-piece absolute"
          style={{
            backgroundColor: piece.color,
            left: piece.left,
            top: piece.top,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            ...getShapeStyle(piece.shape)
          }}
          initial={{ 
            y: -20, 
            rotate: piece.rotation,
            opacity: 0 
          }}
          animate={{ 
            y: window.innerHeight,
            rotate: piece.rotation + 360 * (Math.random() > 0.5 ? 1 : -1),
            x: (Math.random() - 0.5) * 200,
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Center explosion effect */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-1 h-1 bg-white rounded-full"
        initial={{ scale: 0, opacity: 0.6 }}
        animate={{ scale: 80, opacity: 0 }}
        transition={{ duration: 1.2 }}
        style={{ x: "-50%", y: "-50%" }}
      />
    </div>
  );
};

export default Confetti;