import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Star, Skull, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultModalProps {
  isOpen: boolean;
  success: boolean;
  title: string;
  message: string;
  xpGained?: number;
  details?: string[];
  onClose: () => void;
  onRetry?: () => void;
  onNextLevel?: () => void;
}

export function ResultModal({
  isOpen,
  success,
  title,
  message,
  xpGained,
  details,
  onClose,
  onRetry,
  onNextLevel,
}: ResultModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className={`
              relative rounded-2xl p-6 border-2
              ${success 
                ? 'bg-gradient-to-b from-success/20 to-card border-success/50 glow-success' 
                : 'bg-gradient-to-b from-destructive/20 to-card border-destructive/50 glow-error'
              }
            `}>
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="flex justify-center mb-4"
              >
                {success ? (
                  <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center">
                    <Trophy className="w-10 h-10 text-success" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center">
                    <Skull className="w-10 h-10 text-destructive" />
                  </div>
                )}
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-2xl font-display font-bold text-center mb-2 ${
                  success ? 'text-success' : 'text-destructive'
                }`}
              >
                {title}
              </motion.h2>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center text-foreground mb-4"
              >
                {message}
              </motion.p>

              {/* XP Gained */}
              {success && xpGained && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center gap-2 mb-4"
                >
                  <Star className="w-6 h-6 text-xp-gold" />
                  <span className="text-2xl font-display font-bold text-xp-gold">
                    +{xpGained} XP
                  </span>
                </motion.div>
              )}

              {/* Error details */}
              {!success && details && details.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-muted/50 rounded-lg p-4 mb-4 max-h-40 overflow-y-auto"
                >
                  <p className="text-sm font-semibold mb-2 text-muted-foreground">
                    Issues found:
                  </p>
                  <ul className="space-y-1">
                    {details.map((detail, i) => (
                      <li key={i} className="text-sm text-foreground">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3"
              >
                {success ? (
                  <Button
                    onClick={onNextLevel}
                    variant="success"
                    className="flex-1"
                    size="lg"
                  >
                    Next Level →
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={onRetry}
                      variant="outline"
                      className="flex-1"
                      size="lg"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                    <Button
                      onClick={onClose}
                      variant="secondary"
                      className="flex-1"
                      size="lg"
                    >
                      Review Code
                    </Button>
                  </>
                )}
              </motion.div>

              {/* Confetti for success */}
              {success && <ModalConfetti />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ModalConfetti() {
  const colors = ['#fbbf24', '#22c55e', '#3b82f6', '#ec4899', '#f97316'];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            top: 0,
          }}
          initial={{ y: 0, opacity: 1 }}
          animate={{ 
            y: 400,
            opacity: 0,
            rotate: Math.random() * 720 - 360,
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: Math.random() * 0.3,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
