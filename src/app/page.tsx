
"use client";

import { useState, useEffect, useCallback } from 'react';
import StartScreen from '@/components/game/StartScreen';
import SetupScreen from '@/components/game/SetupScreen';
import GameScreen from '@/components/game/GameScreen';
import EndScreen from '@/components/game/EndScreen';
import TransitionModal from '@/components/game/TransitionModal';
import { byteBuVeriBankasi } from '@/data/words';
import type { Word, GameState, Team, TeamScores, ModalContent, GameSettings, ActiveTeamTurnStats } from '@/lib/types';

const DEFAULT_TEAM_1_NAME = "Team Cyber";
const DEFAULT_TEAM_2_NAME = "Team Matrix";
const DEFAULT_TOTAL_TURNS = 5;
const DEFAULT_TIME_PER_TURN = 60;
const DEFAULT_BYPASS_PER_TURN = 3;

export default function HomePage() {
  const [gameState, setGameState] = useState<GameState>('start_screen');
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  const [teamScores, setTeamScores] = useState<TeamScores>({ A: 0, B: 0 });
  const [teamNames, setTeamNames] = useState<{ A: string, B: string }>({ A: DEFAULT_TEAM_1_NAME, B: DEFAULT_TEAM_2_NAME });
  const [activeTeam, setActiveTeam] = useState<Team>('A');
  const [currentPlayedTurns, setCurrentPlayedTurns] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME_PER_TURN);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [usedWordIds, setUsedWordIds] = useState<Set<number>>(new Set());
  const [modalContent, setModalContent] = useState<ModalContent>(null);
  const [activeTeamTurnStats, setActiveTeamTurnStats] = useState<ActiveTeamTurnStats>({
    correct: 0,
    error: 0,
    bypassLeft: DEFAULT_BYPASS_PER_TURN,
  });
  const [statFlash, setStatFlash] = useState<string | null>(null); // 'correct', 'error', 'bypass', 'scoreA', 'scoreB'

  const triggerStatFlash = (statKey: string) => {
    setStatFlash(statKey);
    setTimeout(() => setStatFlash(null), 300); // Animation duration
  };

  const selectRandomWord = useCallback(() => {
    let availableWords = byteBuVeriBankasi.filter(word => !usedWordIds.has(word.id));
    if (availableWords.length === 0) {
      setUsedWordIds(new Set());
      availableWords = byteBuVeriBankasi;
      if (availableWords.length === 0) {
        setCurrentWord(null);
        console.error("Word bank is empty!");
        // Consider ending game or showing error
        return;
      }
    }
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const newWord = availableWords[randomIndex];
    setCurrentWord(newWord);
    setUsedWordIds(prev => new Set(prev).add(newWord.id));
  }, [usedWordIds]);

  const startActiveTeamTurnActual = useCallback(() => {
    if (!gameSettings) return;
    setModalContent(null);
    setGameState('playing');
    setTimeLeft(gameSettings.timePerTurn);
    setActiveTeamTurnStats({
      correct: 0,
      error: 0,
      bypassLeft: gameSettings.bypassRightsPerTurn,
    });
    selectRandomWord();
  }, [gameSettings, selectRandomWord]);

  const initGame = useCallback((settings: GameSettings) => {
    setGameSettings(settings);
    setTeamNames({ A: settings.team1Name, B: settings.team2Name });
    setTeamScores({ A: 0, B: 0 });
    setActiveTeam('A');
    setCurrentPlayedTurns(0);
    setUsedWordIds(new Set());
    setGameState('transition');
    setModalContent({
      title: `${settings.team1Name} Başlıyor!`,
      bodyText: `İlk tur için hazır mısınız?`,
      buttonText: `${settings.team1Name} Turunu Başlat`,
      onConfirm: startActiveTeamTurnActual,
    });
  }, [startActiveTeamTurnActual]);

  const finishGame = useCallback(() => {
    setGameState('end');
    setModalContent(null);
  }, []);

  const handleTurnCompletion = useCallback(() => {
    if (!gameSettings || !teamNames) return;

    const newPlayedTurns = currentPlayedTurns + 1;
    setCurrentPlayedTurns(newPlayedTurns);

    if (newPlayedTurns >= gameSettings.totalTurns) {
      finishGame();
    } else {
      const nextTeam = activeTeam === 'A' ? 'B' : 'A';
      const nextTeamName = nextTeam === 'A' ? teamNames.A : teamNames.B;
      setActiveTeam(nextTeam);
      setGameState('transition');
      setModalContent({
        title: "Tur Bitti!",
        scoreMessage: `${teamNames.A}: ${teamScores.A} - ${teamNames.B}: ${teamScores.B}`,
        bodyText: `Sıra ${nextTeamName}'de! Hazır mısınız?`,
        buttonText: `${nextTeamName} Turunu Başlat`,
        onConfirm: startActiveTeamTurnActual,
      });
    }
  }, [currentPlayedTurns, activeTeam, teamScores, gameSettings, teamNames, finishGame, startActiveTeamTurnActual]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      handleTurnCompletion();
    }
    return () => clearInterval(timerId);
  }, [gameState, timeLeft, handleTurnCompletion]);

  const updateScoreAndStats = (points: number, statType: 'correct' | 'error') => {
    setTeamScores(prevScores => {
      const newScore = prevScores[activeTeam] + points;
      triggerStatFlash(activeTeam === 'A' ? 'scoreA' : 'scoreB');
      return {
        ...prevScores,
        [activeTeam]: newScore < 0 ? 0 : newScore // Prevent negative total score
      };
    });
    setActiveTeamTurnStats(prevStats => {
      const updatedStats = { ...prevStats };
      if (statType === 'correct') updatedStats.correct += 1;
      if (statType === 'error') updatedStats.error += 1;
      triggerStatFlash(statType);
      return updatedStats;
    });
  };

  const handleCorrect = () => {
    updateScoreAndStats(1, 'correct');
    selectRandomWord();
  };

  const handleTaboo = () => {
    updateScoreAndStats(-1, 'error');
    selectRandomWord();
  };

  const handleBypass = () => {
    if (activeTeamTurnStats.bypassLeft > 0) {
      setActiveTeamTurnStats(prevStats => {
        triggerStatFlash('bypass');
        return { ...prevStats, bypassLeft: prevStats.bypassLeft - 1 };
      });
      selectRandomWord();
    }
  };

  const restartGame = () => {
    setGameSettings(null);
    setGameState('setup');
    setModalContent(null);
  };
  
  const goToSetup = () => {
    setGameState('setup');
  };

  return (
    <main className="flex-grow container mx-auto flex flex-col items-center justify-center p-0 sm:p-4 relative overflow-hidden bg-gray-900 text-gray-100 min-h-screen">
      <div className="scanline-overlay"></div>

      {gameState === 'start_screen' && <StartScreen onStartGame={goToSetup} />}
      
      {gameState === 'setup' && (
        <SetupScreen 
          onStartGame={initGame} 
          defaultSettings={{
            team1Name: DEFAULT_TEAM_1_NAME,
            team2Name: DEFAULT_TEAM_2_NAME,
            totalTurns: DEFAULT_TOTAL_TURNS,
            timePerTurn: DEFAULT_TIME_PER_TURN,
            bypassRightsPerTurn: DEFAULT_BYPASS_PER_TURN,
          }}
        />
      )}
      
      {gameState === 'playing' && gameSettings && currentWord && (
        <GameScreen
          gameSettings={gameSettings}
          teamNames={teamNames}
          timeLeft={timeLeft}
          teamScores={teamScores}
          activeTeam={activeTeam}
          activeTeamTurnStats={activeTeamTurnStats}
          currentWord={currentWord}
          onCorrect={handleCorrect}
          onTaboo={handleTaboo}
          onBypass={handleBypass}
          statFlash={statFlash}
        />
      )}
      
      {gameState === 'end' && gameSettings && (
        <EndScreen 
          teamScores={teamScores} 
          teamNames={teamNames} 
          onRestartGame={restartGame} 
        />
      )}

      {modalContent && gameState === 'transition' && (
        <TransitionModal
          title={modalContent.title}
          scoreMessage={modalContent.scoreMessage}
          bodyText={modalContent.bodyText}
          buttonText={modalContent.buttonText}
          onConfirm={modalContent.onConfirm}
        />
      )}
    </main>
  );
}
