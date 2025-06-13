
"use client";

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, Info } from 'lucide-react';

interface TransitionModalProps {
  title: string;
  scoreMessage?: string;
  bodyText: string;
  buttonText: string;
  onConfirm: () => void;
}

const TransitionModal: FC<TransitionModalProps> = ({ title, scoreMessage, bodyText, buttonText, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-modal-appear">
      <Card className="w-full max-w-md bg-slate-800 text-gray-200 shadow-2xl border-2 border-purple-500 animate-modal-scale-up">
        <CardHeader className="border-b-2 border-purple-600">
          <CardTitle className="font-headline text-3xl md:text-4xl text-purple-400 text-center flex items-center justify-center">
            <Info className="mr-3 h-8 w-8"/> {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4 py-6">
          {scoreMessage && (
            <p className="font-headline text-xl md:text-2xl text-cyan-300">{scoreMessage}</p>
          )}
          <p className="font-body text-lg md:text-xl text-gray-300">{bodyText}</p>
        </CardContent>
        <CardFooter className="flex justify-center p-6 border-t-2 border-purple-600">
          <Button
            onClick={onConfirm}
            size="lg"
            className="font-headline text-xl px-8 py-6 bg-accent hover:bg-accent/80 text-white"
          >
            <PlayCircle className="mr-2 h-6 w-6" />
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TransitionModal;
