import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import useGameSounds from '../hooks/useGameSounds';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const { playMoveSound, playWinSound, startBackgroundMusic, stopBackgroundMusic } = useGameSounds();
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const initializedRef = useRef(false);

  // Detección de cambios en isMusicPlaying para depuración
  useEffect(() => {
    console.log("Music playing state changed:", isMusicPlaying);
  }, [isMusicPlaying]);

  // Gestionar interacción del usuario para la primera reproducción
  useEffect(() => {
    // Este efecto solo se ejecuta una vez
    if (!initializedRef.current) {
      const handleFirstInteraction = () => {
        console.log("User interaction detected");
        // Solo reproducimos si queremos que comience automáticamente
        if (!isMusicPlaying) {
          toggleMusic();
        }
        document.removeEventListener('click', handleFirstInteraction);
        initializedRef.current = true;
      };
      
      document.addEventListener('click', handleFirstInteraction);
      
      return () => {
        document.removeEventListener('click', handleFirstInteraction);
      };
    }
  }, [isMusicPlaying]);

  // Limpiar música al desmontar
  useEffect(() => {
    return () => {
      if (isMusicPlaying) {
        stopBackgroundMusic();
      }
    };
  }, [stopBackgroundMusic, isMusicPlaying]);

  const toggleMusic = () => {
    console.log("Toggle music called, current state:", isMusicPlaying);
    if (isMusicPlaying) {
      stopBackgroundMusic();
      setIsMusicPlaying(false);
    } else {
      startBackgroundMusic();
      setIsMusicPlaying(true);
    }
  };

  // Función para habilitar/deshabilitar todos los sonidos
  const setAllSounds = (enabled) => {
    if (enabled) {
      if (!isMusicPlaying) {
        startBackgroundMusic();
        setIsMusicPlaying(true);
      }
    } else {
      if (isMusicPlaying) {
        stopBackgroundMusic();
        setIsMusicPlaying(false);
      }
    }
  };

  return (
    <SoundContext.Provider 
      value={{ 
        isMusicPlaying, 
        toggleMusic, 
        setAllSounds,
        playMoveSound: isMusicPlaying ? playMoveSound : () => {},
        playWinSound: isMusicPlaying ? playWinSound : () => {}
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);