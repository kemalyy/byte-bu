"use client";

import type { FC } from 'react';
import { TimerIcon } from 'lucide-react';

interface TimerDisplayProps {
  timeLeft: number;
}

const TimerDisplay: FC<TimerDisplayProps> = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center space-x-2 p-3 bg-card rounded-lg shadow-md border border-primary/50">
      <TimerIcon className="h-6 w-6 text-primary" />
      <span className="font-headline text-2xl text-primary tabular-nums">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

export default TimerDisplay;
