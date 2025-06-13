export interface Word {
  id: number;
  kelime: string;
  yasakliKelimeler: string[];
}

export type GameState = 'start' | 'playing' | 'end';
