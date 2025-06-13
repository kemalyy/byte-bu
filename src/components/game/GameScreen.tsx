
"use client";

import type { FC } from 'react';
import type { Word, Team, TeamScores } from '@/lib/types';
import TimerDisplay from './TimerDisplay';
import Scoreboard from './Scoreboard';
import WordCard from './WordCard';
import ControlButtons from './ControlButtons';

interface GameScreenProps {
  timeLeft: number;
  teamScores: TeamScores;
  activeTeam: Team;
  bypassRights: number;
  currentWord: Word | null;
  onCorrect: () => void;
  onTaboo: () => void;
  onBypass: () => void;
}

const GameScreen: FC<GameScreenProps> = ({
  timeLeft,
  teamScores,
  activeTeam,
  bypassRights,
  currentWord,
  onCorrect,
  onTaboo,
  onBypass,
}) => {
  return (
    <div className="flex flex-col items-center justify-between h-full w-full p-2 md:p-6 space-y-4">
      <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
        {/* Scoreboard now takes full width and handles its own layout */}
        <Scoreboard teamScores={teamScores} activeTeam={activeTeam} />
        {/* Timer needs to be positioned; can be part of a top bar or beside scoreboard on wider screens */}
        <div className="self-center md:self-start">
           <TimerDisplay timeLeft={timeLeft} />
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center w-full max-w-lg">
        <WordCard word={currentWord} />
      </div>
      
      <div className="w-full max-w-lg">
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
