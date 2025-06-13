"use client";

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Award, RotateCcw } from 'lucide-react';

interface EndScreenProps {
  score: number;
  onRestartGame: () => void;
}

const EndScreen: FC<EndScreenProps> = ({ score, onRestartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <Award className="h-24 w-24 text-primary mb-6 animate-bounce" />
      <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary mb-4">
        Oturum Sonlandı!
      </h1>
      <p className="font-headline text-3xl md:text-4xl text-foreground mb-10">
        Nihai Puan: <span className="text-accent font-bold">{score}</span>
      </p>
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
