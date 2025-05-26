import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WinLine = ({ winningCells, cellSize = 40 }) => {
  const [lineStyle, setLineStyle] = useState({});
  
  useEffect(() => {
    if (!winningCells || winningCells.length < 2) return;
    
    // Get the first and last cells in the winning line
    const startCell = winningCells[0];
    const endCell = winningCells[winningCells.length - 1];
    
    // Calculate line position and dimensions
    let width, height, top, left, angle = 0;
    
    // For horizontal wins
    if (startCell[0] === endCell[0]) {
      width = cellSize * (winningCells.length - 1) + cellSize * 0.5;
      height = 8;
      top = startCell[0] * cellSize + cellSize / 2 - 4;
      left = startCell[1] * cellSize + cellSize / 2;
    } 
    // For vertical wins
    else if (startCell[1] === endCell[1]) {
      width = 8;
      height = cellSize * (winningCells.length - 1) + cellSize * 0.5;
      top = startCell[0] * cellSize + cellSize / 2;
      left = startCell[1] * cellSize + cellSize / 2 - 4;
    }
    // For diagonal wins
    else {
      // Calculate diagonal line length (Pythagoras)
      const diagLength = Math.sqrt(
        Math.pow((endCell[0] - startCell[0]) * cellSize, 2) + 
        Math.pow((endCell[1] - startCell[1]) * cellSize, 2)
      );
      
      width = diagLength + cellSize * 0.3;
      height = 8;
      
      // Position at the center of the first cell
      top = startCell[0] * cellSize + cellSize / 2;
      left = startCell[1] * cellSize + cellSize / 2;
      
      // Calculate angle based on direction
      const dx = endCell[1] - startCell[1];
      const dy = endCell[0] - startCell[0];
      angle = Math.atan2(dy, dx) * (180 / Math.PI);
      
      // Adjust for transform-origin
      top -= 4;
    }
    
    setLineStyle({
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
      transform: angle !== 0 ? `rotate(${angle}deg)` : undefined,
      transformOrigin: 'left center'
    });
  }, [winningCells, cellSize]);
  
  if (!winningCells || winningCells.length < 2) return null;
  
  return (
    <motion.div
      className="win-line absolute rounded-full"
      style={lineStyle}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
  );
};

export default WinLine;