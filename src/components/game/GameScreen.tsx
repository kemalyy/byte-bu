"use client";

import type { FC } from 'react';
import type { Word } from '@/lib/types';
import TimerDisplay from './TimerDisplay';
import Scoreboard from './Scoreboard';
import WordCard from './WordCard';
import ControlButtons from './ControlButtons';

interface GameScreenProps {
  timeLeft: number;
  score: number;
  bypassRights: number;
  currentWord: Word | null;
  onCorrect: () => void;
  onTaboo: () => void;
  onBypass: () => void;
}

const GameScreen: FC<GameScreenProps> = ({
  timeLeft,
  score,
  bypassRights,
  currentWord,
  onCorrect,
  onTaboo,
  onBypass,
}) => {
  return (
    <div className="flex flex-col items-center justify-between h-full p-4 md:p-8 space-y-6">
      <div className="w-full flex justify-between items-start">
        <Scoreboard score={score} bypassRights={bypassRights} />
        <TimerDisplay timeLeft={timeLeft} />
      </div>
      
      <div className="flex-grow flex items-center justify-center w-full">
        <WordCard word={currentWord} />
      </div>
      
      <div className="w-full">
        <ControlButtons
          onCorrect={onCorrect}
          onTaboo={onTaboo}
          onBypass={onBypass}
          canBypass={bypassRights > 0}
        />
      </div>
    </div>
  );
};

export default GameScreen;
