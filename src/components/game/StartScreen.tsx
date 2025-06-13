
"use client";

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle, Zap } from 'lucide-react';

interface StartScreenProps {
  onStartGame: () => void; // Now transitions to Setup Screen
}

const StartScreen: FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 md:p-8 animate-modal-scale-up">
      <Zap className="h-20 w-20 text-cyan-400 mb-4 animate-pulse" />
      <h1 className="font-headline text-6xl md:text-7xl font-bold text-cyan-300 mb-3">
        Byte-Bu v3.0
      </h1>
      <p className="text-gray-400 text-lg md:text-xl mb-10 font-body">
        Gelişmiş Ayarlar, Yeni Arayüz, Tam Rekabet!
      </p>
      <Button
        onClick={onStartGame}
        size="lg"
        className="font-headline text-xl px-8 py-6 bg-accent hover:bg-accent/80 text-white"
      >
        <PlayCircle className="mr-2 h-6 w-6" />
        Oturumu Başlat
      </Button>
    </div>
  );
};

export default StartScreen;
