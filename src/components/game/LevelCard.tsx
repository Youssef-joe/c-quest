import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Check, Star, ChevronRight } from 'lucide-react';
import { Level } from '@/types/game';
import { cn } from '@/lib/utils';

interface LevelCardProps {
  level: Level;
  isUnlocked: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
  onClick: () => void;
}

const levelIcons: Record<number, string> = {
  1: '🔒',
  2: '🍝',
  3: '🌲',
  4: '✨',
  5: '📜',
  6: '⚔️',
  7: '🏰',
};

export function LevelCard({ level, isUnlocked, isCompleted, isCurrent, onClick }: LevelCardProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={!isUnlocked}
      className={cn(
        "relative w-full p-4 rounded-xl text-left transition-all duration-300",
        "border-2",
        isUnlocked
          ? isCurrent
            ? "magic-border glow-gold"
            : isCompleted
              ? "border-success/50 bg-success/10"
              : "border-primary/30 bg-card hover:border-primary/60 hover:bg-card/80"
          : "border-muted bg-muted/30 cursor-not-allowed opacity-60"
      )}
      whileHover={isUnlocked ? { scale: 1.02 } : {}}
      whileTap={isUnlocked ? { scale: 0.98 } : {}}
    >
      {/* Completion badge */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-lg"
          >
            <Check className="w-5 h-5 text-success-foreground" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-start gap-4">
        {/* Level icon */}
        <div className={cn(
          "w-14 h-14 rounded-lg flex items-center justify-center text-2xl",
          isUnlocked
            ? "bg-gradient-to-br from-primary/20 to-secondary/20"
            : "bg-muted"
        )}>
          {isUnlocked ? levelIcons[level.id] : <Lock className="w-6 h-6 text-muted-foreground" />}
        </div>

        {/* Level info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-code text-muted-foreground">
              MODULE {level.id}
            </span>
            {isCurrent && (
              <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full font-semibold">
                CURRENT
              </span>
            )}
          </div>
          
          <h3 className={cn(
            "font-display text-lg font-bold mt-1 truncate",
            isUnlocked ? "text-foreground" : "text-muted-foreground"
          )}>
            {level.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mt-1 truncate">
            {level.subtitle}
          </p>

          {/* XP reward */}
          <div className="flex items-center gap-2 mt-2">
            <Star className="w-4 h-4 text-xp-gold" />
            <span className="text-sm font-code text-xp-gold">
              +{level.xpReward} XP
            </span>
          </div>
        </div>

        {/* Arrow indicator */}
        {isUnlocked && (
          <ChevronRight className={cn(
            "w-5 h-5 transition-transform",
            isCurrent ? "text-primary" : "text-muted-foreground"
          )} />
        )}
      </div>

      {/* Progress indicator for current level */}
      {isCurrent && !isCompleted && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-primary/30 rounded-b-xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-primary"
            animate={{ width: ['0%', '30%'] }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </motion.button>
  );
}
