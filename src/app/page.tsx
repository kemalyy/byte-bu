
"use client";

import { useState, useEffect, useCallback } from 'react';
import StartScreen from '@/components/game/StartScreen';
import GameScreen from '@/components/game/GameScreen';
import EndScreen from '@/components/game/EndScreen';
import TransitionModal from '@/components/game/TransitionModal';
import { byteBuVeriBankasi } from '@/data/words';
import type { Word, GameState, Team, TeamScores, ModalContent } from '@/lib/types';

const INITIAL_TIME = 60;
const INITIAL_BYPASS_RIGHTS = 3;
const TOTAL_TURNS_PER_GAME = 5; // A-B-A-B-A

export default function HomePage() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [teamScores, setTeamScores] = useState<TeamScores>({ A: 0, B: 0 });
  const [activeTeam, setActiveTeam] = useState<Team>('A');
  const [currentPlayedTurns, setCurrentPlayedTurns] = useState(0);
  const [bypassRights, setBypassRights] = useState(INITIAL_BYPASS_RIGHTS);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [usedWordIds, setUsedWordIds] = useState<Set<number>>(new Set());
  const [modalContent, setModalContent] = useState<ModalContent>(null);

  const selectRandomWord = useCallback(() => {
    let availableWords = byteBuVeriBankasi.filter(word => !usedWordIds.has(word.id));

    if (availableWords.length === 0) {
      // Consider resetting or indicating no more words, for now, reset.
      console.warn("All words used, resetting word list.");
      setUsedWordIds(new Set()); 
      availableWords = byteBuVeriBankasi;
      if (availableWords.length === 0) { // Still no words (empty bank)
        setCurrentWord(null);
        // Potentially end game or show error
        console.error("Word bank is empty!");
        return;
      }
    }
    
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const newWord = availableWords[randomIndex];
    setCurrentWord(newWord);
    setUsedWordIds(prev => new Set(prev).add(newWord.id));
  }, [usedWordIds]);

  const startActiveTeamTurn = useCallback(() => {
    setModalContent(null);
    setGameState('playing');
    setTimeLeft(INITIAL_TIME);
    setBypassRights(INITIAL_BYPASS_RIGHTS);
    selectRandomWord();
  }, [selectRandomWord]);

  const initializeTwoPlayerGame = useCallback(() => {
    setTeamScores({ A: 0, B: 0 });
    setActiveTeam('A');
    setCurrentPlayedTurns(0);
    setUsedWordIds(new Set());
    setGameState('start'); // Keep in start, modal will overlay
    setModalContent({
      title: "Oyun Başlıyor!",
      bodyText: "Takım A'nın Turu Başlıyor.",
      buttonText: "Takım A Turunu Başlat",
      onConfirm: startActiveTeamTurn,
    });
  }, [startActiveTeamTurn]);
  
  const finishGame = useCallback(() => {
    setGameState('end');
    setModalContent(null);
  }, []);

  const handleTurnCompletion = useCallback(() => {
    const newPlayedTurns = currentPlayedTurns + 1;
    setCurrentPlayedTurns(newPlayedTurns);

    if (newPlayedTurns >= TOTAL_TURNS_PER_GAME) {
      finishGame();
    } else {
      const nextTeam = activeTeam === 'A' ? 'B' : 'A';
      setActiveTeam(nextTeam);
      setGameState('start'); // To show modal before next turn
      setModalContent({
        title: "Tur Bitti!",
        scoreMessage: `Takım A: ${teamScores.A} - Takım B: ${teamScores.B}`,
        bodyText: `Sıra Takım ${nextTeam}'de! Hazır mısınız?`,
        buttonText: `Takım ${nextTeam} Turunu Başlat`,
        onConfirm: startActiveTeamTurn,
      });
    }
  }, [currentPlayedTurns, activeTeam, teamScores, finishGame, startActiveTeamTurn]);

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

  const updateScore = (points: number) => {
    setTeamScores(prevScores => ({
      ...prevScores,
      [activeTeam]: prevScores[activeTeam] + points
    }));
  };

  const handleCorrect = () => {
    updateScore(1);
    selectRandomWord();
  };

  const handleTaboo = () => {
    updateScore(-1);
    selectRandomWord();
  };

  const handleBypass = () => {
    if (bypassRights > 0) {
      setBypassRights(prev => prev - 1);
      selectRandomWord();
    }
  };

  const restartGame = () => {
    setGameState('start');
    setModalContent(null);
    // Other states will be reset by initializeTwoPlayerGame or startActiveTeamTurn
  };

  return (
    <main className="flex-grow container mx-auto flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {gameState === 'start' && !modalContent && <StartScreen onStartGame={initializeTwoPlayerGame} />}
      
      {gameState === 'playing' && !modalContent && currentWord && (
        <GameScreen
          timeLeft={timeLeft}
          teamScores={teamScores}
          activeTeam={activeTeam}
          bypassRights={bypassRights}
          currentWord={currentWord}
          onCorrect={handleCorrect}
          onTaboo={handleTaboo}
          onBypass={handleBypass}
        />
      )}
      
      {gameState === 'end' && <EndScreen teamScores={teamScores} onRestartGame={restartGame} />}

      {modalContent && (
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
