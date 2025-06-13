
"use client";

import type { FC } from 'react';
import type { TeamScores } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Award, RotateCcw, Trophy } from 'lucide-react';

interface EndScreenProps {
  teamScores: TeamScores;
  teamNames: { A: string, B: string };
  onRestartGame: () => void;
}

const EndScreen: FC<EndScreenProps> = ({ teamScores, teamNames, onRestartGame }) => {
  const winnerName = teamScores.A > teamScores.B ? teamNames.A : teamScores.B > teamScores.A ? teamNames.B : 'Berabere';
  
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 md:p-8 animate-modal-scale-up">
      <Trophy className="h-24 w-24 text-yellow-400 mb-6 animate-bounce" />
      <h1 className="font-headline text-5xl md:text-6xl font-bold text-cyan-300 mb-4">
        Oyun Bitti!
      </h1>
      
      {winnerName !== 'Berabere' ? (
        <p className="font-headline text-3xl md:text-4xl text-purple-400 mb-2">
          Kazanan: <span className="font-bold">{winnerName}</span>
        </p>
      ) : (
        <p className="font-headline text-3xl md:text-4xl text-purple-400 mb-2">
          Oyun Berabere!
        </p>
      )}

      <div className="font-body text-xl md:text-2xl text-gray-300 mb-8 space-y-2">
        <p>{teamNames.A} Skoru: <span className="font-bold text-cyan-400">{teamScores.A}</span></p>
        <p>{teamNames.B} Skoru: <span className="font-bold text-cyan-400">{teamScores.B}</span></p>
      </div>

      <Button
        onClick={onRestartGame}
        size="lg"
        className="font-headline text-xl px-8 py-6 bg-accent hover:bg-accent/80 text-white"
      >
        <RotateCcw className="mr-2 h-6 w-6" />
        Sistemi Yeniden Başlat
      </Button>
    </div>
  );
};

export default EndScreen;
