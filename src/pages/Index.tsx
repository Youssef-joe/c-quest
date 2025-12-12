import { useState, useCallback, useEffect } from 'react';
import { HomePage } from '@/components/game/HomePage';
import { GameLayout } from '@/components/game/GameLayout';
import { levels } from '@/data/levels';
import { useGameProgress } from '@/hooks/useGameProgress';

const Index = () => {
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const { completeLevel, setCurrentLevel, isLoaded } = useGameProgress();

  const handleStartLevel = useCallback((levelId: number) => {
    setActiveLevel(levelId);
    setCurrentLevel(levelId);
  }, [setCurrentLevel]);

  const handleBack = useCallback(() => {
    setActiveLevel(null);
  }, []);

  const handleComplete = useCallback((xp: number) => {
    if (activeLevel) {
      completeLevel(activeLevel, xp);
    }
  }, [activeLevel, completeLevel]);

  const handleNextLevel = useCallback(() => {
    if (activeLevel && activeLevel < levels.length) {
      setActiveLevel(activeLevel + 1);
      setCurrentLevel(activeLevel + 1);
    } else {
      setActiveLevel(null);
    }
  }, [activeLevel, setCurrentLevel]);

  // Show loading state while localStorage is being read
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="font-display text-lg text-primary">Loading your quest...</span>
        </div>
      </div>
    );
  }

  // Show game layout when a level is active
  if (activeLevel !== null) {
    const level = levels.find(l => l.id === activeLevel);
    if (!level) {
      setActiveLevel(null);
      return null;
    }

    return (
      <GameLayout
        level={level}
        onComplete={handleComplete}
        onBack={handleBack}
        onNextLevel={handleNextLevel}
        hasNextLevel={activeLevel < levels.length}
      />
    );
  }

  // Show home page
  return <HomePage onStartLevel={handleStartLevel} />;
};

export default Index;
