import { motion } from 'framer-motion';
import { Sparkles, Star, Trophy, Zap } from 'lucide-react';

interface XPBarProps {
  currentXP: number;
  maxXP: number;
}

export function XPBar({ currentXP, maxXP }: XPBarProps) {
  const percentage = Math.min((currentXP / maxXP) * 100, 100);
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-display text-sm text-primary font-semibold">
            EXPERIENCE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-xp-gold" />
          <span className="font-code text-sm text-xp-gold font-bold">
            {currentXP} / {maxXP} XP
          </span>
        </div>
      </div>
      
      <div className="relative h-4 bg-muted rounded-full overflow-hidden border border-primary/20">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-xp-gold to-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ left: '-20%' }}
          animate={{ left: '120%' }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatDelay: 3,
            ease: 'easeInOut'
          }}
        />
        
        {/* Milestone markers */}
        {[25, 50, 75].map((milestone) => (
          <div
            key={milestone}
            className="absolute top-0 bottom-0 w-0.5 bg-background/50"
            style={{ left: `${milestone}%` }}
          />
        ))}
      </div>
      
      {/* Level indicator */}
      <div className="flex justify-between mt-2">
        <div className="flex items-center gap-1">
          <Zap className="w-4 h-4 text-accent" />
          <span className="text-xs text-muted-foreground">Apprentice</span>
        </div>
        <div className="flex items-center gap-1">
          <Trophy className="w-4 h-4 text-primary" />
          <span className="text-xs text-muted-foreground">Code Wizard</span>
        </div>
      </div>
    </div>
  );
}
