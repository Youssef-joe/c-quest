import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Lightbulb, RotateCcw, ChevronLeft, BookOpen } from 'lucide-react';
import { Level } from '@/types/game';
import { Button } from '@/components/ui/button';
import { CodeEditor } from './CodeEditor';
import { LevelVisuals } from './LevelVisuals';
import { ResultModal } from './ResultModal';
import { validateCode, getRandomFailMessage, getRandomSuccessMessage } from '@/lib/validation';

interface GameLayoutProps {
  level: Level;
  onComplete: (xp: number) => void;
  onBack: () => void;
  onNextLevel: () => void;
  hasNextLevel: boolean;
}

export function GameLayout({ level, onComplete, onBack, onNextLevel, hasNextLevel }: GameLayoutProps) {
  const [code, setCode] = useState(level.starterCode);
  const [visualState, setVisualState] = useState<'idle' | 'success' | 'failure'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    message: string;
    details?: string[];
  } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleRun = useCallback(() => {
    const result = validateCode(code, level.validationRules);
    setValidationResult(result);
    
    if (result.success) {
      setVisualState('success');
      setIsCompleted(true);
      setTimeout(() => {
        setShowModal(true);
        onComplete(level.xpReward);
      }, 1000);
    } else {
      setVisualState('failure');
      setTimeout(() => {
        setShowModal(true);
      }, 500);
    }
  }, [code, level, onComplete]);

  const handleReset = useCallback(() => {
    setCode(level.starterCode);
    setVisualState('idle');
    setShowHint(false);
  }, [level.starterCode]);

  const handleRetry = useCallback(() => {
    setShowModal(false);
    setVisualState('idle');
  }, []);

  const handleNextLevel = useCallback(() => {
    setShowModal(false);
    onNextLevel();
  }, [onNextLevel]);

  // Reset code and state when level changes
  useEffect(() => {
    setCode(level.starterCode);
    setVisualState('idle');
    setShowModal(false);
    setValidationResult(null);
    setIsCompleted(false);
    setShowHint(false);
  }, [level]);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div>
            <span className="text-xs font-code text-muted-foreground">MODULE {level.id}</span>
            <h1 className="font-display text-xl font-bold text-foreground">{level.title}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowHint(!showHint)}>
            <Lightbulb className="w-4 h-4 mr-1" />
            Hint
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </header>

      {/* Main content - split screen */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel - Story & Visuals */}
        <motion.div 
          className="w-1/2 flex flex-col border-r border-border overflow-hidden"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Story section */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Story card */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-lg font-bold text-foreground">Your Quest</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-foreground whitespace-pre-line leading-relaxed">
                    {level.story}
                  </p>
                </div>
              </div>

              {/* Hint section */}
              {showHint && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-primary/10 rounded-xl p-6 border border-primary/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-primary">Hint</h3>
                  </div>
                  <p className="text-sm text-foreground">{level.hint}</p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Visual feedback area */}
          <div className="h-72 bg-muted/30 border-t border-border p-4">
            <LevelVisuals type={level.visualType} state={visualState} />
          </div>
        </motion.div>

        {/* Right panel - Code Editor */}
        <motion.div 
          className="w-1/2 flex flex-col overflow-hidden"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Editor header */}
          <div className="flex items-center justify-between px-4 py-3 bg-card/50 border-b border-border">
            <span className="font-code text-sm text-muted-foreground">editor.cs</span>
            <Button 
              onClick={handleRun}
              variant="magic"
              disabled={isCompleted}
            >
              <Play className="w-4 h-4 mr-2" />
              Run Code ⚡
            </Button>
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-hidden">
            <CodeEditor 
              code={code} 
              onChange={setCode}
              readOnly={isCompleted}
            />
          </div>
        </motion.div>
      </div>

      {/* Result Modal */}
      <ResultModal
        isOpen={showModal}
        success={validationResult?.success || false}
        title={validationResult?.success ? getRandomSuccessMessage() : getRandomFailMessage()}
        message={validationResult?.success ? level.successMessage : level.failureMessage}
        xpGained={validationResult?.success ? level.xpReward : undefined}
        details={validationResult?.details}
        onClose={() => setShowModal(false)}
        onRetry={handleRetry}
        onNextLevel={hasNextLevel ? handleNextLevel : undefined}
      />
    </div>
  );
}
