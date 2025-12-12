import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  LockOpen, 
  Lock, 
  Skull, 
  Sparkles,
  Coins
} from 'lucide-react';

type VisualType = 'treasure' | 'spaghetti' | 'animals' | 'shapes' | 'payments' | 'duel' | 'cart';

interface LevelVisualsProps {
  type: VisualType;
  state: 'idle' | 'success' | 'failure';
}

export function LevelVisuals({ type, state }: LevelVisualsProps) {
  switch (type) {
    case 'treasure':
      return <TreasureChestVisual state={state} />;
    case 'spaghetti':
      return <SpaghettiMonsterVisual state={state} />;
    case 'animals':
      return <AnimalsVisual state={state} />;
    case 'shapes':
      return <ShapesVisual state={state} />;
    case 'payments':
      return <PaymentsVisual state={state} />;
    case 'duel':
      return <DuelVisual state={state} />;
    case 'cart':
      return <CartVisual state={state} />;
    default:
      return <TreasureChestVisual state={state} />;
  }
}

function TreasureChestVisual({ state }: { state: 'idle' | 'success' | 'failure' }) {
  const [goblinPosition, setGoblinPosition] = useState(-100);
  
  useEffect(() => {
    if (state === 'failure') {
      const interval = setInterval(() => {
        setGoblinPosition(prev => {
          if (prev >= 50) return -100;
          return prev + 10;
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setGoblinPosition(-100);
    }
  }, [state]);

  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          background: state === 'success' 
            ? 'radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)'
            : state === 'failure'
              ? 'radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)'
        }}
      />
      
      {/* Treasure Chest */}
      <motion.div
        className="relative"
        animate={{
          scale: state === 'success' ? [1, 1.1, 1] : state === 'failure' ? [1, 0.95, 1] : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Chest base */}
        <div className="relative">
          <motion.div
            className="w-32 h-24 bg-gradient-to-b from-amber-600 to-amber-800 rounded-lg border-4 border-amber-900 relative"
            animate={{
              boxShadow: state === 'success' 
                ? '0 0 30px rgba(251, 191, 36, 0.6)'
                : state === 'failure'
                  ? '0 0 30px rgba(239, 68, 68, 0.6)'
                  : '0 0 10px rgba(251, 191, 36, 0.3)'
            }}
          >
            {/* Chest lock */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2">
              <AnimatePresence mode="wait">
                {state === 'success' ? (
                  <motion.div
                    key="unlocked"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    className="text-success"
                  >
                    <LockOpen className="w-8 h-8" />
                  </motion.div>
                ) : state === 'failure' ? (
                  <motion.div
                    key="broken"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                    className="text-destructive"
                  >
                    <Lock className="w-8 h-8" />
                  </motion.div>
                ) : (
                  <motion.div key="locked" className="text-primary">
                    <Lock className="w-8 h-8" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Gold coins inside (visible on success) */}
            <AnimatePresence>
              {state === 'success' && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Coins className="w-6 h-6 text-xp-gold" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Chest lid */}
          <motion.div
            className="absolute -top-10 left-0 w-32 h-12 bg-gradient-to-b from-amber-500 to-amber-700 rounded-t-xl border-4 border-amber-900 origin-bottom"
            animate={{
              rotateX: state === 'success' ? -30 : 0,
            }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
        </div>
        
        {/* Sparkles on success */}
        <AnimatePresence>
          {state === 'success' && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    scale: 0,
                    rotate: 0 
                  }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100 - 30,
                    scale: [0, 1, 0],
                    rotate: 360
                  }}
                  transition={{ 
                    duration: 1, 
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  <Sparkles className="w-6 h-6 text-xp-gold" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Goblin on failure */}
      <motion.div
        className="absolute"
        style={{ left: `${goblinPosition}%`, top: '60%' }}
        animate={{
          opacity: state === 'failure' ? 1 : 0,
        }}
      >
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 0.3, repeat: Infinity }}
          className="text-4xl"
        >
          👺
        </motion.div>
        <motion.span
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-destructive text-white px-2 py-1 rounded whitespace-nowrap"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          Hehe! Public fields!
        </motion.span>
      </motion.div>
    </div>
  );
}

function SpaghettiMonsterVisual({ state }: { state: 'idle' | 'success' | 'failure' }) {
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <motion.div
        className="text-8xl"
        animate={{
          scale: state === 'success' ? 0.3 : state === 'failure' ? 1.3 : 1,
          rotate: state === 'failure' ? [0, 10, -10, 0] : 0,
          opacity: state === 'success' ? 0.3 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        🍝
      </motion.div>
      
      {state === 'success' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute text-6xl"
        >
          ✨
        </motion.div>
      )}
      
      {state === 'failure' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 text-sm text-destructive font-bold"
        >
          IT GROWS STRONGER! 💀
        </motion.div>
      )}
    </div>
  );
}

function AnimalsVisual({ state }: { state: 'idle' | 'success' | 'failure' }) {
  return (
    <div className="relative w-full h-64 flex items-center justify-center gap-8">
      {/* Eagle */}
      <motion.div
        className="text-5xl"
        animate={{
          y: state === 'success' ? [0, -20, 0] : 0,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🦅
      </motion.div>
      
      {/* Penguin */}
      <motion.div
        className="text-5xl"
        animate={{
          y: state === 'failure' ? [0, -50, 100] : 0,
          rotate: state === 'failure' ? [0, 360] : 0,
        }}
        transition={{ duration: 1 }}
      >
        🐧
      </motion.div>
      
      {state === 'success' && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 text-success font-bold"
        >
          Each animal behaves correctly! 🌲
        </motion.span>
      )}
      
      {state === 'failure' && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 text-destructive font-bold"
        >
          💥 CRASH! Penguin tried to fly!
        </motion.span>
      )}
    </div>
  );
}

function ShapesVisual({ state }: { state: 'idle' | 'success' | 'failure' }) {
  return (
    <div className="relative w-full h-64 flex items-center justify-center gap-4">
      {['🔵', '🟥', '🔺'].map((shape, i) => (
        <motion.div
          key={i}
          className="text-5xl"
          animate={{
            scale: state === 'success' ? [1, 1.2, 1] : 1,
            rotate: state === 'success' ? [0, 360] : 0,
            y: state === 'failure' ? [0, 10, 0] : 0,
          }}
          transition={{ 
            duration: 1, 
            delay: i * 0.2,
            repeat: state === 'success' ? Infinity : 0,
            repeatDelay: 1
          }}
        >
          {shape}
        </motion.div>
      ))}
    </div>
  );
}

function PaymentsVisual({ state }: { state: 'idle' | 'success' | 'failure' }) {
  return (
    <div className="relative w-full h-64 flex items-center justify-center gap-6">
      {['💳', '🪙', '💰'].map((icon, i) => (
        <motion.div
          key={i}
          className="text-5xl"
          animate={{
            y: state === 'success' ? [0, -10, 0] : 0,
            scale: state === 'success' ? [1, 1.1, 1] : state === 'failure' ? 0.8 : 1,
          }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          {icon}
        </motion.div>
      ))}
      
      {state === 'success' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute text-success text-lg font-bold"
        >
          ✅ All payments processed!
        </motion.div>
      )}
    </div>
  );
}

function DuelVisual({ state }: { state: 'idle' | 'success' | 'failure' }) {
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <motion.div
        className="text-5xl"
        animate={{ x: state === 'success' ? -30 : 0 }}
      >
        🧙‍♂️
      </motion.div>
      
      <motion.div
        className="text-4xl mx-4"
        animate={{
          rotate: state === 'success' ? 360 : 0,
          scale: state === 'success' ? [1, 1.5, 1] : 1,
        }}
      >
        ⚔️
      </motion.div>
      
      <motion.div
        className="text-5xl"
        animate={{ x: state === 'success' ? 30 : 0 }}
      >
        🧙
      </motion.div>
      
      {state === 'success' && (
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 50 }}
          className="absolute text-success font-bold"
        >
          Both paradigms triumph! ⚡
        </motion.span>
      )}
    </div>
  );
}

function CartVisual({ state }: { state: 'idle' | 'success' | 'failure' }) {
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <motion.div
        className="text-6xl"
        animate={{
          x: state === 'success' ? [0, 100] : 0,
          scale: state === 'failure' ? [1, 1.2, 0.8] : 1,
        }}
        transition={{ duration: 1 }}
      >
        🛒
      </motion.div>
      
      {state === 'success' && (
        <>
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 100 }}
            className="absolute text-5xl"
          >
            ✅
          </motion.div>
          <Confetti />
        </>
      )}
    </div>
  );
}

function Confetti() {
  const colors = ['#fbbf24', '#22c55e', '#3b82f6', '#ec4899', '#f97316'];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ 
            y: 300,
            opacity: 0,
            rotate: Math.random() * 720 - 360,
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: Math.random() * 0.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
