import { motion } from 'framer-motion';
import { Sparkles, Play, BookOpen, Trophy, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { XPBar } from '@/components/game/XPBar';
import { LevelCard } from '@/components/game/LevelCard';
import { levels, getTotalXP } from '@/data/levels';
import { useGameProgress } from '@/hooks/useGameProgress';

interface HomePageProps {
  onStartLevel: (levelId: number) => void;
}

export function HomePage({ onStartLevel }: HomePageProps) {
  const { progress, isLevelUnlocked, isLevelCompleted, resetProgress } = useGameProgress();
  const totalXP = getTotalXP();

  const currentLevel = levels.find(l => l.id === progress.currentLevel) || levels[0];

  return (
    <div className="min-h-screen bg-background rune-pattern">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-3xl"
              >
                🧙‍♂️
              </motion.div>
              <div>
                <h1 className="font-display text-xl font-bold text-foreground">OOP Quest</h1>
                <p className="text-xs text-muted-foreground">Master C# Object-Oriented Programming</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:block w-64">
                <XPBar currentXP={progress.totalXP} maxXP={totalXP} />
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={resetProgress}
                className="text-muted-foreground hover:text-destructive"
              >
                Reset Progress
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-6 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Interactive Learning Adventure</span>
            </motion.div>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
              Become a{' '}
              <span className="text-glow text-primary">Code Wizard</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Battle spaghetti code monsters, seal magical treasure chests, and master 
              Object-Oriented Programming through epic quests and interactive challenges!
            </p>

            {/* Quick stats */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-primary">
                  {progress.completedLevels.length}/{levels.length}
                </p>
                <p className="text-sm text-muted-foreground">Levels Complete</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-xp-gold">
                  {progress.totalXP}
                </p>
                <p className="text-sm text-muted-foreground">XP Earned</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-accent">7</p>
                <p className="text-sm text-muted-foreground">Epic Modules</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="xl" 
                variant="magic"
                onClick={() => onStartLevel(currentLevel.id)}
                className="min-w-[200px]"
              >
                <Play className="w-5 h-5 mr-2" />
                {progress.completedLevels.length > 0 ? 'Continue Quest' : 'Start Quest'}
              </Button>
              
              <Button 
                size="xl" 
                variant="outline"
                onClick={() => document.getElementById('levels')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                View All Levels
              </Button>
            </div>
          </motion.div>

          {/* Floating decorations */}
          <motion.div
            className="absolute top-20 left-10 text-4xl opacity-20"
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ⚔️
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10 text-4xl opacity-20"
            animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            🛡️
          </motion.div>
          <motion.div
            className="absolute top-40 right-20 text-3xl opacity-15"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨
          </motion.div>
        </div>
      </section>

      {/* Levels Section */}
      <section id="levels" className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Your Quest Awaits
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Progress through 7 challenging modules, each teaching essential OOP concepts. 
              Complete each quest to unlock the next!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {levels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <LevelCard
                  level={level}
                  isUnlocked={isLevelUnlocked(level.id)}
                  isCompleted={isLevelCompleted(level.id)}
                  isCurrent={level.id === progress.currentLevel}
                  onClick={() => isLevelUnlocked(level.id) && onStartLevel(level.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎮</span>
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Gamified Learning</h3>
              <p className="text-sm text-muted-foreground">
                Earn XP, unlock achievements, and battle code monsters as you learn!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💻</span>
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Real C# Code</h3>
              <p className="text-sm text-muted-foreground">
                Write actual C# code with syntax highlighting and instant feedback!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Modern C#</h3>
              <p className="text-sm text-muted-foreground">
                Learn records, interfaces, LINQ, and modern OOP best practices!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧙‍♂️</span>
              <span className="font-display font-bold text-foreground">OOP Quest</span>
            </div>
            
            <p className="text-sm text-muted-foreground text-center">
              Built with ❤️ to teach Object-Oriented Programming
            </p>

            <div className="flex items-center gap-4">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                {progress.completedLevels.length === levels.length 
                  ? '🎉 All quests complete!' 
                  : `${levels.length - progress.completedLevels.length} quests remaining`
                }
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
