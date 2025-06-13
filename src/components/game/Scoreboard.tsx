
"use client";

import type { FC } from 'react';
import type { Team, TeamScores } from '@/lib/types';
import { Users, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScoreboardProps {
  teamScores: TeamScores;
  activeTeam: Team;
}

const Scoreboard: FC<ScoreboardProps> = ({ teamScores, activeTeam }) => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-around items-center gap-4 mb-4 md:mb-6 p-3 bg-card rounded-lg shadow-lg border border-border">
      <div 
        className={cn(
          "team-score-area p-4 rounded-lg border-2 w-full md:w-auto text-center transition-all duration-300",
          activeTeam === 'A' ? "border-accent shadow-accent/30 shadow-lg scale-105 bg-accent/10" : "border-muted"
        )}
      >
        <h3 className="font-headline text-xl text-primary flex items-center justify-center">
          <Users className="mr-2 h-5 w-5" /> TAKIM A
        </h3>
        <p className={cn("font-headline text-4xl score-display", activeTeam === 'A' ? "text-accent" : "text-muted-foreground")}>
          {teamScores.A}
        </p>
      </div>
      <div 
        className={cn(
          "team-score-area p-4 rounded-lg border-2 w-full md:w-auto text-center transition-all duration-300",
          activeTeam === 'B' ? "border-accent shadow-accent/30 shadow-lg scale-105 bg-accent/10" : "border-muted"
        )}
      >
        <h3 className="font-headline text-xl text-primary flex items-center justify-center">
          <Users className="mr-2 h-5 w-5" /> TAKIM B
        </h3>
        <p className={cn("font-headline text-4xl score-display", activeTeam === 'B' ? "text-accent" : "text-muted-foreground")}>
          {teamScores.B}
        </p>
      </div>
    </div>
  );
};

export default Scoreboard;
