
"use client";

import type { FC } from 'react';
import type { Word } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Ban } from 'lucide-react';

interface WordCardProps {
  word: Word | null;
}

const WordCard: FC<WordCardProps> = ({ word }) => {
  if (!word) {
    return (
      <Card className="bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/30 text-green-400 w-full max-w-md mx-auto rounded-lg overflow-hidden min-h-[300px] flex items-center justify-center animate-card-enter">
        <p className="font-code text-xl p-4">Kelime yükleniyor...</p>
      </Card>
    );
  }

  return (
    <Card key={word.id} className="bg-slate-900 border-2 border-cyan-600 shadow-xl shadow-cyan-500/20 text-green-300 w-full max-w-lg mx-auto rounded-xl overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-cyan-400/40 animate-card-enter">
      <CardHeader className="border-b-2 border-cyan-700 p-6 bg-slate-800/50">
        <h2 className="font-headline text-4xl md:text-5xl text-cyan-300 text-center tracking-wider break-words">
          {word.kelime}
        </h2>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <h3 className="text-sm text-orange-400 font-code uppercase tracking-wider flex items-center">
          <Ban className="mr-2 h-4 w-4 text-red-500"/>
          YASAKLI KELİMELER:
        </h3>
        <ul className="list-none space-y-2 font-code text-lg md:text-xl text-green-400">
          {word.yasakliKelimeler.map((yasakKelime, index) => (
            <li key={index} className="flex items-center p-2 bg-slate-800/70 rounded-md border border-slate-700 hover:bg-slate-700/70 transition-colors">
              <svg className="w-4 h-4 mr-3 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="break-all">{yasakKelime}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WordCard;
