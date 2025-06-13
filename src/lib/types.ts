
export interface Word {
  id: number;
  kelime: string;
  yasakliKelimeler: string[];
}

export type GameState = 'start' | 'playing' | 'end';

export type Team = 'A' | 'B';

export interface TeamScores {
  A: number;
  B: number;
}

export type ModalContent = {
  title: string;
  scoreMessage?: string;
  bodyText: string;
  buttonText: string;
  onConfirm: () => void;
} | null;
