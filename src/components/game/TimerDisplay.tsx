
"use client";

import type { FC } from 'react';
import { TimerIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerDisplayProps {
  timeLeft: number;
}

const TimerDisplay: FC<TimerDisplayProps> = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const timeUpSoon = timeLeft <= 10;

  return (
    <div className={cn(
      "flex items-center justify-center space-x-2 md:space-x-3 p-3 md:p-4 bg-slate-800/80 rounded-lg shadow-xl border-2 border-slate-700 w-auto mx-auto",
      timeUpSoon && timeLeft > 0 && "border-red-500 animate-pulse",
      timeLeft === 0 && "border-red-700"
      )}>
      <TimerIcon className={cn("h-6 w-6 md:h-8 md:w-8", timeUpSoon ? "text-red-400" : "text-cyan-400")} />
      <span className={cn(
        "font-headline text-3xl md:text-5xl tabular-nums",
        timeUpSoon ? "text-red-400" : "text-cyan-300"
        )}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

export default TimerDisplay;
