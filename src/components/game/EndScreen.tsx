
"use client";

import type { FC } from 'react';
import type { TeamScores } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Award, RotateCcw, Trophy } from 'lucide-react';

interface EndScreenProps {
  teamScores: TeamScores;
  onRestartGame: () => void;
}

const EndScreen: FC<EndScreenProps> = ({ teamScores, onRestartGame }) => {
  const winner = teamScores.A > teamScores.B ? 'Takım A' : teamScores.B > teamScores.A ? 'Takım B' : 'Berabere';
  const winningScore = Math.max(teamScores.A, teamScores.B);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 md:p-8">
      <Trophy className="h-24 w-24 text-yellow-500 mb-6 animate-bounce" />
      <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary mb-4">
        Oyun Bitti!
      </h1>
      
      {winner !== 'Berabere' ? (
        <p className="font-headline text-3xl md:text-4xl text-accent mb-2">
          Kazanan: <span className="font-bold">{winner}</span>
        </p>
      ) : (
        <p className="font-headline text-3xl md:text-4xl text-accent mb-2">
          Oyun Berabere!
        </p>
      )}

      <div className="font-body text-xl md:text-2xl text-foreground mb-8 space-y-2">
        <p>Takım A Skoru: <span className="font-bold text-primary">{teamScores.A}</span></p>
        <p>Takım B Skoru: <span className="font-bold text-primary">{teamScores.B}</span></p>
      </div>

      <Button
        onClick={onRestartGame}
        size="lg"
        className="font-headline text-xl px-8 py-6"
      >
        <RotateCcw className="mr-2 h-6 w-6" />
        Sistemi Yeniden Başlat
      </Button>
    </div>
  );
};

export default EndScreen;
