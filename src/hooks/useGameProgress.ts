import { useState, useEffect, useCallback } from 'react';
import { GameProgress } from '@/types/game';

const STORAGE_KEY = 'oop-quest-progress';

const defaultProgress: GameProgress = {
  currentLevel: 1,
  completedLevels: [],
  totalXP: 0,
  achievements: [],
  lastPlayed: new Date().toISOString(),
};

export function useGameProgress() {
  const [progress, setProgress] = useState<GameProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress(parsed);
      } catch (e) {
        console.error('Failed to parse saved progress:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  const completeLevel = useCallback((levelId: number, xpReward: number) => {
    setProgress((prev) => {
      if (prev.completedLevels.includes(levelId)) {
        return prev; // Already completed
      }
      
      return {
        ...prev,
        completedLevels: [...prev.completedLevels, levelId],
        totalXP: prev.totalXP + xpReward,
        currentLevel: Math.max(prev.currentLevel, levelId + 1),
        lastPlayed: new Date().toISOString(),
      };
    });
  }, []);

  const unlockAchievement = useCallback((achievementId: string) => {
    setProgress((prev) => {
      if (prev.achievements.includes(achievementId)) {
        return prev;
      }
      return {
        ...prev,
        achievements: [...prev.achievements, achievementId],
      };
    });
  }, []);

  const setCurrentLevel = useCallback((levelId: number) => {
    setProgress((prev) => ({
      ...prev,
      currentLevel: levelId,
      lastPlayed: new Date().toISOString(),
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const isLevelUnlocked = useCallback((levelId: number) => {
    return levelId === 1 || progress.completedLevels.includes(levelId - 1);
  }, [progress.completedLevels]);

  const isLevelCompleted = useCallback((levelId: number) => {
    return progress.completedLevels.includes(levelId);
  }, [progress.completedLevels]);

  return {
    progress,
    isLoaded,
    completeLevel,
    unlockAchievement,
    setCurrentLevel,
    resetProgress,
    isLevelUnlocked,
    isLevelCompleted,
  };
}
