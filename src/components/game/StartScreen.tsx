"use client";

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

interface StartScreenProps {
  onStartGame: () => void;
}

const StartScreen: FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <h1 className="font-headline text-6xl md:text-7xl font-bold text-primary mb-4 animate-pulse">
        Byte-Bu
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl mb-12 font-body">
        Teknoloji Dünyasının Tabu Oyunu
      </p>
      <Button
        onClick={onStartGame}
        size="lg"
        className="font-headline text-xl px-8 py-6"
      >
        <PlayCircle className="mr-2 h-6 w-6" />
        Oturumu Başlat
      </Button>
    </div>
  );
};

export default StartScreen;
