import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const LINES = ['DREAM', 'CODE', 'ACHIEVE'];

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress]   = useState(0);
  const [visible,  setVisible]    = useState(true);
  const [lineIdx,  setLineIdx]    = useState(0);
  const raf = useRef<number>(0);
  const start = useRef<number>(0);

  useEffect(() => {
    // Cycle through motto lines
    const lt = setInterval(() => setLineIdx(i => (i + 1) % LINES.length), 600);
    return () => clearInterval(lt);
  }, []);

  useEffect(() => {
    const animate = (ts: number) => {
      if (!start.current) start.current = ts;
      const elapsed = ts - start.current;
      const raw = (elapsed / 2400) * 100;          // 2.4 s total
      const eased = Math.min(100, raw < 60
        ? raw * 1.1                                 // fast at start
        : 60 + (raw - 60) * 0.9);                  // slower near end
      setProgress(eased);

      if (eased < 100) {
        raf.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 600);
        }, 300);
      }
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [onComplete]);

  const pct = Math.min(Math.round(progress), 100);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Radial glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 65%)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* SHIYAM letters animate in */}
          <div className="flex gap-3 mb-8">
            {'SHIYAM'.split('').map((ch, i) => (
              <motion.span
                key={i}
                className="font-black font-space"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  background: 'linear-gradient(135deg, #ffffff, #60a5fa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                }}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: i * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          {/* Cycling tagline */}
          <div className="h-5 overflow-hidden mb-12">
            <AnimatePresence mode="wait">
              <motion.p
                key={lineIdx}
                className="text-xs font-mono-custom text-zinc-600 tracking-[0.4em] text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0,  opacity: 1 }}
                exit={{   y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {LINES[lineIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="relative w-56 h-[2px] rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                width: `${pct}%`,
                boxShadow: '0 0 10px rgba(59,130,246,0.5)',
              }}
              transition={{ duration: 0.05 }}
            />
          </div>

          <motion.p
            className="text-zinc-700 text-xs mt-4 font-mono-custom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {pct}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
