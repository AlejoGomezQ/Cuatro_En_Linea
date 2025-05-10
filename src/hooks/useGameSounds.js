import { useMemo, useCallback } from "react";

const useGameSounds = () => {
  const sounds = useMemo(
    () => ({
      move: "/sounds/move.wav",
      win: "/sounds/win.mp3",
    }),
    []
  );

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

  return {
    playMoveSound: () => playSound("move"),
    playWinSound: () => playSound("win"),
  };
};

export default useGameSounds;
