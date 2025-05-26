import { useMemo, useCallback, useRef, useEffect } from "react";

const useGameSounds = () => {
  const sounds = useMemo(
    () => ({
      move: "/sounds/move.mp3",
      win: "/sounds/win.mp3",
      background: "/sounds/fondo.mp3", 
    }),
    []
  );

  const backgroundMusicRef = useRef(null);

  const playSound = useCallback((soundKey) => {
    try {
      const audio = new Audio(sounds[soundKey]);
      audio.play().catch(error => {
        console.warn(`Error playing sound: ${error.message}`);
      });
    } catch (error) {
      console.warn(`Error creating audio: ${error.message}`);
    }
  }, [sounds]);

  const startBackgroundMusic = useCallback(() => {
    console.log("Starting background music");
    try {
      // Si ya existe una instancia de música, no hacemos nada
      if (backgroundMusicRef.current) {
        console.log("Background music already playing");
        return;
      }
      
      // Crear nueva instancia de audio para la música de fondo
      console.log("Creating new audio instance");
      const bgMusic = new Audio(sounds.background);
      bgMusic.loop = true;
      bgMusic.volume = 0.5; // Volumen al 50%
      
      // Asignar la referencia antes de reproducir
      backgroundMusicRef.current = bgMusic;
      
      // Reproducir y manejar posibles errores
      bgMusic.play().catch(error => {
        console.error(`Error playing background music: ${error.message}`);
        backgroundMusicRef.current = null;
      });
      
    } catch (error) {
      console.error(`Error creating background music: ${error.message}`);
    }
  }, [sounds]);

  const stopBackgroundMusic = useCallback(() => {
    console.log("Stopping background music");
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
      backgroundMusicRef.current = null;
      console.log("Background music stopped");
    } else {
      console.log("No background music to stop");
    }
  }, []);

  // Limpieza al desmontar el componente
  useEffect(() => {
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    };
  }, []);

  return {
    playMoveSound: () => playSound("move"),
    playWinSound: () => playSound("win"),
    startBackgroundMusic,
    stopBackgroundMusic,
    isMusicPlaying: () => backgroundMusicRef.current !== null
  };
};

export default useGameSounds;