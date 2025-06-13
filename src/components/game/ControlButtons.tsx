"use client";

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, SkipForward } from 'lucide-react';

interface ControlButtonsProps {
  onCorrect: () => void;
  onTaboo: () => void;
  onBypass: () => void;
  canBypass: boolean;
}

const ControlButtons: FC<ControlButtonsProps> = ({ onCorrect, onTaboo, onBypass, canBypass }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 w-full max-w-lg mx-auto">
      <Button
        onClick={onCorrect}
        className="bg-green-600 hover:bg-green-700 text-white font-headline text-lg py-6 sm:py-3"
        size="lg"
      >
        <CheckCircle className="mr-2 h-5 w-5" />
        DOĞRU
      </Button>
      <Button
        onClick={onTaboo}
        variant="destructive"
        className="font-headline text-lg py-6 sm:py-3"
        size="lg"
      >
        <XCircle className="mr-2 h-5 w-5" />
        HATA // TABU
      </Button>
      <Button
        onClick={onBypass}
        disabled={!canBypass}
        className="bg-orange-500 hover:bg-orange-600 text-white font-headline text-lg disabled:bg-muted disabled:text-muted-foreground py-6 sm:py-3"
        size="lg"
      >
        <SkipForward className="mr-2 h-5 w-5" />
        BYPASS
      </Button>
    </div>
  );
};

export default ControlButtons;
