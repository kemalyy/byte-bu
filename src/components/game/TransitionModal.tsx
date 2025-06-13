
"use client";

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

interface TransitionModalProps {
  title: string;
  scoreMessage?: string;
  bodyText: string;
  buttonText: string;
  onConfirm: () => void;
}

const TransitionModal: FC<TransitionModalProps> = ({ title, scoreMessage, bodyText, buttonText, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 modal-overlay animate-modal-appear">
      <Card className="w-full max-w-md bg-card text-card-foreground shadow-2xl border-primary modal-content animate-modal-scale-up">
        <CardHeader>
          <CardTitle className="font-headline text-3xl md:text-4xl text-primary text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {scoreMessage && (
            <p className="font-headline text-xl md:text-2xl text-foreground">{scoreMessage}</p>
          )}
          <p className="font-body text-lg md:text-xl text-muted-foreground">{bodyText}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={onConfirm}
            size="lg"
            className="font-headline text-xl px-8 py-6"
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
