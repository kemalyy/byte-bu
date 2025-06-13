
"use client";

import type { FC } from 'react';
import { cn } from '@/lib/utils';
import type { ActiveTeamTurnStats } from '@/lib/types';
import { Target, Zap, ShieldAlert, SkipForwardIcon, Users, CheckCircle, XCircle } from 'lucide-react';

interface TeamPodProps {
  teamName: string;
  totalScore: number;
  turnStats: ActiveTeamTurnStats;
  isActive: boolean;
  statFlashKey?: 'score' | 'correct' | 'error' | 'bypass' | null;
  teamColorClass: string; // e.g., 'border-cyan-500 text-cyan-400' or 'border-purple-500 text-purple-400'
}

const TeamPod: FC<TeamPodProps> = ({ teamName, totalScore, turnStats, isActive, statFlashKey, teamColorClass }) => {
  
  const getStatItemClass = (key: string) => cn(
    "flex justify-between items-center p-2 bg-slate-700/50 rounded-md border border-slate-600 transition-all duration-300",
    statFlashKey === key && "stat-flash-animation"
  );
  
  return (
    <div
      className={cn(
        "team-pod flex flex-col w-full md:w-1/4 lg:w-1/5 p-3 sm:p-4 border-2 rounded-xl bg-slate-800/70 shadow-lg transition-all duration-500 ease-in-out",
        isActive ? `active-team-pod ${teamColorClass} shadow-${teamColorClass.split('-')[1]}-500/40` : "border-slate-700 opacity-70",
        teamColorClass
      )}
    >
      <h2 className={cn(
        "font-headline text-xl sm:text-2xl text-center mb-3 pb-2 border-b-2",
        isActive ? teamColorClass : "border-slate-600 text-gray-400"
      )}>
        <Users className={cn("inline-block mr-2 h-5 w-5 sm:h-6 sm:w-6", isActive ? teamColorClass : "text-gray-500")} />
        {teamName}
      </h2>
      
      <div className="mb-3 text-center">
        <p className="font-code text-xs sm:text-sm uppercase text-gray-400 tracking-wider">Toplam Puan</p>
        <p className={cn("font-headline text-4xl sm:text-5xl", isActive ? teamColorClass : "text-gray-500", getStatItemClass('score'))}>
          {totalScore}
        </p>
      </div>

      <div className="space-y-2 text-sm sm:text-base">
        <h3 className="font-code text-xs uppercase text-gray-500 tracking-wider text-center border-t border-b border-slate-600 py-1 mb-2">Aktif Tur</h3>
        <div className={getStatItemClass('correct')}>
          <span className="flex items-center text-green-400">
            <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Doğru:
          </span>
          <span className="font-code text-lg sm:text-xl text-green-300">{turnStats.correct}</span>
        </div>
        <div className={getStatItemClass('error')}>
          <span className="flex items-center text-red-400">
            <XCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Hata:
          </span>
          <span className="font-code text-lg sm:text-xl text-red-300">{turnStats.error}</span>
        </div>
        <div className={getStatItemClass('bypass')}>
          <span className="flex items-center text-orange-400">
            <SkipForwardIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Bypass:
          </span>
          <span className="font-code text-lg sm:text-xl text-orange-300">{turnStats.bypassLeft}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamPod;
