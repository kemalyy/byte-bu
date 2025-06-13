"use client";

import { useState, useEffect, useCallback } from 'react';
import StartScreen from '@/components/game/StartScreen';
import GameScreen from '@/components/game/GameScreen';
import EndScreen from '@/components/game/EndScreen';
import { byteBuVeriBankasi } from '@/data/words';
import type { Word, GameState } from '@/lib/types';

const INITIAL_TIME = 60;
const INITIAL_BYPASS_RIGHTS = 3;

export default function HomePage() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [bypassRights, setBypassRights] = useState(INITIAL_BYPASS_RIGHTS);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [usedWordIds, setUsedWordIds] = useState<Set<number>>(new Set());

  const selectRandomWord = useCallback(() => {
    let availableWords = byteBuVeriBankasi.filter(word => !usedWordIds.has(word.id));

    if (availableWords.length === 0) {
      setUsedWordIds(new Set()); // Reset if all words are used
      availableWords = byteBuVeriBankasi;
    }

    if (availableWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableWords.length);
      const newWord = availableWords[randomIndex];
      setCurrentWord(newWord);
      setUsedWordIds(prev => new Set(prev).add(newWord.id));
    } else {
      // Should not happen if byteBuVeriBankasi is not empty
      setCurrentWord(null); 
    }
  }, [usedWordIds]);

  const startGame = useCallback(() => {
    setScore(0);
    setBypassRights(INITIAL_BYPASS_RIGHTS);
    setTimeLeft(INITIAL_TIME);
    setUsedWordIds(new Set());
    selectRandomWord();
    setGameState('playing');
  }, [selectRandomWord]);

  const endGame = useCallback(() => {
    setGameState('end');
  }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(timerId);
  }, [gameState, timeLeft, endGame]);

  const handleCorrect = () => {
    setScore(prev => prev + 1);
    selectRandomWord();
  };

  const handleTaboo = () => {
    setScore(prev => prev - 1);
    selectRandomWord();
  };

  const handleBypass = () => {
    if (bypassRights > 0) {
      setBypassRights(prev => prev - 1);
      selectRandomWord();
    }
  };

  const restartGame = () => {
    setGameState('start');
    // Values will be reset when startGame is called via StartScreen button
  };

  return (
    <main className="flex-grow container mx-auto flex flex-col items-center justify-center">
      {gameState === 'start' && <StartScreen onStartGame={startGame} />}
      {gameState === 'playing' && currentWord && (
        <GameScreen
          timeLeft={timeLeft}
          score={score}
          bypassRights={bypassRights}
          currentWord={currentWord}
          onCorrect={handleCorrect}
          onTaboo={handleTaboo}
          onBypass={handleBypass}
        />
      )}
      {gameState === 'end' && <EndScreen score={score} onRestartGame={restartGame} />}
    </main>
  );
}
