
"use client";

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle, Zap } from 'lucide-react';

interface StartScreenProps {
  onStartGame: () => void;
}

const StartScreen: FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 md:p-8">
      <Zap className="h-20 w-20 text-primary mb-4 animate-pulse" />
      <h1 className="font-headline text-6xl md:text-7xl font-bold text-primary mb-3">
        Byte-Bu v2
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl mb-10 font-body">
        İki Takımlı Teknoloji Tabu Kapışması!
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
