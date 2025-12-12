export interface Level {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  story: string;
  hint: string;
  starterCode: string;
  solution: string;
  validationRules: ValidationRule[];
  xpReward: number;
  successMessage: string;
  failureMessage: string;
  visualType: 'treasure' | 'spaghetti' | 'animals' | 'shapes' | 'payments' | 'duel' | 'cart';
}

export interface ValidationRule {
  type: 'contains' | 'notContains' | 'regex' | 'containsAll' | 'containsAny';
  value: string | string[];
  message: string;
}

export interface GameProgress {
  currentLevel: number;
  completedLevels: number[];
  totalXP: number;
  achievements: string[];
  lastPlayed: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: () => boolean;
}

export type ValidationResult = {
  success: boolean;
  message: string;
  details?: string[];
};
