
"use client";

import type { FC } from 'react';
import type { Word, Team, TeamScores, GameSettings, ActiveTeamTurnStats } from '@/lib/types';
import TimerDisplay from './TimerDisplay';
import WordCard from './WordCard';
import ControlButtons from './ControlButtons';
import TeamPod from './TeamPod'; // New component

interface GameScreenProps {
  gameSettings: GameSettings;
  teamNames: { A: string, B: string };
  timeLeft: number;
  teamScores: TeamScores;
  activeTeam: Team;
  activeTeamTurnStats: ActiveTeamTurnStats;
  currentWord: Word | null;
  onCorrect: () => void;
  onTaboo: () => void;
  onBypass: () => void;
  statFlash: string | null;
}

const GameScreen: FC<GameScreenProps> = ({
  gameSettings,
  teamNames,
  timeLeft,
  teamScores,
  activeTeam,
  activeTeamTurnStats,
  currentWord,
  onCorrect,
  onTaboo,
  onBypass,
  statFlash,
}) => {
  const getStatFlashKeyForPod = (team: Team, currentStatFlash: string | null) => {
    if (!currentStatFlash) return null;
    if (team === 'A') {
      if (currentStatFlash === 'scoreA') return 'score';
      if (activeTeam === 'A' && ['correct', 'error', 'bypass'].includes(currentStatFlash)) return currentStatFlash;
    }
    if (team === 'B') {
      if (currentStatFlash === 'scoreB') return 'score';
      if (activeTeam === 'B' && ['correct', 'error', 'bypass'].includes(currentStatFlash)) return currentStatFlash;
    }
    return null;
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch justify-between h-full w-full p-2 md:p-4 lg:p-6 space-y-4 md:space-y-0 md:space-x-4">
      {/* Left Pod (Team A) */}
      <TeamPod
        teamName={teamNames.A}
        totalScore={teamScores.A}
        turnStats={activeTeam === 'A' ? activeTeamTurnStats : { correct: 0, error: 0, bypassLeft: 0 }}
        isActive={activeTeam === 'A'}
        statFlashKey={getStatFlashKeyForPod('A', statFlash)}
        teamColorClass="team-a-colors"
      />

      {/* Center Area */}
      <div className="flex flex-col items-center justify-start flex-grow w-full md:w-1/2 space-y-4 order-first md:order-none">
        <TimerDisplay timeLeft={timeLeft} />
        <div className="w-full flex-grow flex items-center justify-center min-h-[300px] sm:min-h-[350px]">
          <WordCard word={currentWord} />
        </div>
        <div className="w-full max-w-lg">
          <ControlButtons
            onCorrect={onCorrect}
            onTaboo={onTaboo}
            onBypass={onBypass}
            canBypass={activeTeamTurnStats.bypassLeft > 0}
          />
        </div>
      </div>

      {/* Right Pod (Team B) */}
      <TeamPod
        teamName={teamNames.B}
        totalScore={teamScores.B}
        turnStats={activeTeam === 'B' ? activeTeamTurnStats : { correct: 0, error: 0, bypassLeft: 0 }}
        isActive={activeTeam === 'B'}
        statFlashKey={getStatFlashKeyForPod('B', statFlash)}
        teamColorClass="team-b-colors"
      />
    </div>
  );
};

export default GameScreen;
