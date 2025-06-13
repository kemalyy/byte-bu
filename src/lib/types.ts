
export interface Word {
  id: number;
  kelime: string;
  yasakliKelimeler: string[];
}

export type GameState = 'start_screen' | 'setup' | 'playing' | 'transition' | 'end';

export type Team = 'A' | 'B';

export interface TeamScores {
  A: number;
  B: number;
}

export interface GameSettings {
  team1Name: string;
  team2Name: string;
  totalTurns: number;
  timePerTurn: number;
  bypassRightsPerTurn: number;
}

export interface ActiveTeamTurnStats {
  correct: number;
  error: number;
  bypassLeft: number;
}

export type ModalContent = {
  title: string;
  scoreMessage?: string; // Takım A: X - Takım B: Y
  bodyText: string; // Sıradaki takım veya özel mesaj
  buttonText: string;
  onConfirm: () => void;
} | null;
