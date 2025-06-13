
"use client";

import type { FC } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { GameSettings } from '@/lib/types';
import { SlidersHorizontal, Play } from 'lucide-react';

interface SetupScreenProps {
  onStartGame: (settings: GameSettings) => void;
  defaultSettings: GameSettings;
}

const SetupScreen: FC<SetupScreenProps> = ({ onStartGame, defaultSettings }) => {
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (settings.totalTurns < 1 || settings.totalTurns > 10) {
      alert("Toplam Tur Sayısı 1 ile 10 arasında olmalıdır.");
      return;
    }
    if (settings.timePerTurn < 30 || settings.timePerTurn > 120) {
      alert("Tur Başına Süre 30sn ile 120sn arasında olmalıdır.");
      return;
    }
    if (settings.bypassRightsPerTurn < 0 || settings.bypassRightsPerTurn > 10) {
      alert("Bypass Hakkı 0 ile 10 arasında olmalıdır.");
      return;
    }
    if (!settings.team1Name.trim() || !settings.team2Name.trim()) {
      alert("Takım isimleri boş bırakılamaz.");
      return;
    }
    onStartGame(settings);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      <Card className="w-full max-w-lg bg-slate-800 border-cyan-500 shadow-xl shadow-cyan-500/30 text-gray-200 animate-modal-scale-up">
        <CardHeader className="border-b border-cyan-700">
          <CardTitle className="font-headline text-3xl md:text-4xl text-cyan-300 text-center flex items-center justify-center">
            <SlidersHorizontal className="mr-3 h-8 w-8" />
            Oyun Kurulumu
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="team1Name" className="font-headline text-cyan-400 block mb-1">Takım 1 Adı</Label>
                <Input
                  id="team1Name"
                  name="team1Name"
                  type="text"
                  value={settings.team1Name}
                  onChange={handleChange}
                  className="bg-slate-700 border-cyan-600 text-gray-100 focus:ring-cyan-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="team2Name" className="font-headline text-cyan-400 block mb-1">Takım 2 Adı</Label>
                <Input
                  id="team2Name"
                  name="team2Name"
                  type="text"
                  value={settings.team2Name}
                  onChange={handleChange}
                  className="bg-slate-700 border-cyan-600 text-gray-100 focus:ring-cyan-500"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="totalTurns" className="font-headline text-cyan-400 block mb-1">Toplam Tur Sayısı (1-10)</Label>
              <Input
                id="totalTurns"
                name="totalTurns"
                type="number"
                value={settings.totalTurns}
                onChange={handleChange}
                min="1"
                max="10"
                className="bg-slate-700 border-cyan-600 text-gray-100 focus:ring-cyan-500"
                required
              />
            </div>
            <div>
              <Label htmlFor="timePerTurn" className="font-headline text-cyan-400 block mb-1">Tur Başına Süre (sn, 30-120)</Label>
              <Input
                id="timePerTurn"
                name="timePerTurn"
                type="number"
                value={settings.timePerTurn}
                onChange={handleChange}
                min="30"
                max="120"
                step="5"
                className="bg-slate-700 border-cyan-600 text-gray-100 focus:ring-cyan-500"
                required
              />
            </div>
            <div>
              <Label htmlFor="bypassRightsPerTurn" className="font-headline text-cyan-400 block mb-1">Tur Başına Bypass Hakkı (0-10)</Label>
              <Input
                id="bypassRightsPerTurn"
                name="bypassRightsPerTurn"
                type="number"
                value={settings.bypassRightsPerTurn}
                onChange={handleChange}
                min="0"
                max="10"
                className="bg-slate-700 border-cyan-600 text-gray-100 focus:ring-cyan-500"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center p-6 border-t border-cyan-700">
            <Button
              type="submit"
              size="lg"
              className="font-headline text-xl px-8 py-6 bg-accent hover:bg-accent/80 text-white"
            >
              <Play className="mr-2 h-6 w-6" />
              Oyunu Başlat
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SetupScreen;
