import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import useGameSounds from '../hooks/useGameSounds';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const { playMoveSound: originalPlayMoveSound, 
          playWinSound: originalPlayWinSound, 
          startBackgroundMusic, 
          stopBackgroundMusic } = useGameSounds();
          
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const initializedRef = useRef(false);

  // Detección de cambios en estado de sonido para depuración
  useEffect(() => {
    console.log("Sound state changed:", isSoundEnabled);
  }, [isSoundEnabled]);

  // Gestionar interacción del usuario para la primera reproducción
  useEffect(() => {
    // Este efecto solo se ejecuta una vez
    if (!initializedRef.current) {
      const handleFirstInteraction = () => {
        console.log("User interaction detected");
        // Solo reproducimos si queremos que comience automáticamente
        if (!isSoundEnabled) {
          setAllSounds(true);
        }
        document.removeEventListener('click', handleFirstInteraction);
        initializedRef.current = true;
      };
      
      document.addEventListener('click', handleFirstInteraction);
      
      return () => {
        document.removeEventListener('click', handleFirstInteraction);
      };
    }
  }, [isSoundEnabled]);

  // Limpiar música al desmontar
  useEffect(() => {
    return () => {
      if (isSoundEnabled) {
        stopBackgroundMusic();
      }
    };
  }, [stopBackgroundMusic, isSoundEnabled]);

  // Función para controlar todos los sonidos (música y efectos)
  const setAllSounds = (enabled) => {
    console.log("Setting all sounds to:", enabled);
    if (enabled) {
      startBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
    setIsSoundEnabled(enabled);
  };

  // Funciones de sonido condicionadas al estado
  const playMoveSound = () => {
    if (isSoundEnabled) {
      originalPlayMoveSound();
    }
  };
  
  const playWinSound = () => {
    if (isSoundEnabled) {
      originalPlayWinSound();
    }
  };

  return (
    <SoundContext.Provider 
      value={{ 
        isMusicPlaying: isSoundEnabled, // Para mantener compatibilidad
        setAllSounds,
        playMoveSound,
        playWinSound
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);