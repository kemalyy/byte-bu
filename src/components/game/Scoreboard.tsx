"use client";

import type { FC } from 'react';
import { Star, Zap } from 'lucide-react';

interface ScoreboardProps {
  score: number;
  bypassRights: number;
}

const Scoreboard: FC<ScoreboardProps> = ({ score, bypassRights }) => {
  return (
    <div className="space-y-3 p-3 bg-card rounded-lg shadow-md border border-primary/50">
      <div className="flex items-center space-x-2">
        <Star className="h-6 w-6 text-yellow-500" />
        <span className="font-headline text-lg">Puan: </span>
        <span className="font-headline text-2xl text-primary">{score}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Zap className="h-6 w-6 text-orange-500" />
        <span className="font-headline text-lg">Bypass Hakkı: </span>
        <span className="font-headline text-2xl text-primary">{bypassRights}</span>
      </div>
    </div>
  );
};

export default Scoreboard;
