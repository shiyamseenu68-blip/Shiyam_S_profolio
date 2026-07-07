import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Globe, Cpu } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

interface Props {
  onScrollStart: () => void;
}

const subtitle = 'Creating Websites That Feel Alive.';

export default function LandingSection({ onScrollStart }: Props) {
  const [phase, setPhase] = useState<'icons' | 'title' | 'subtitle' | 'ready'>('icons');
  const [scrambledTitle, setScrambledTitle] = useState('Welcome to My Portfolio');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';

  // Text scramble effect
  const scramble = (target: string, duration: number) => {
    const total = duration / 30;
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / total;
      const result = target
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i / target.length < progress) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      setScrambledTitle(result);
      if (frame >= total) {
        clearInterval(interval);
        setScrambledTitle(target);
      }
    }, 30);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('title'), 1000);
    const t2 = setTimeout(() => {
      setPhase('subtitle');
      scramble('Welcome to My Portfolio', 1200);
    }, 1800);
    const t3 = setTimeout(() => setPhase('ready'), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    if (phase !== 'ready') return;
    const onWheel = () => onScrollStart();
    const onTouch = () => onScrollStart();
    window.addEventListener('wheel', onWheel, { once: true });
    window.addEventListener('touchmove', onTouch, { once: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchmove', onTouch);
    };
  }, [phase, onScrollStart]);

  const icons = [
    { Icon: Code2,  label: 'Code',      color: '#3b82f6', delay: 0 },
    { Icon: Cpu,    label: 'Developer', color: '#06b6d4', delay: 0.15 },
    { Icon: Globe,  label: 'Web',       color: '#8b5cf6', delay: 0.3 },
  ];

  return (
    <motion.section
      className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-black overflow-hidden"
      exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <ParticleBackground count={70} />

      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, #3b82f6 0%, #06b6d4 40%, transparent 70%)',
          }}
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 6, repeat: Infinity } }}
          initial={{ x: '-50%', y: '-50%' }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-[0.04] blur-3xl"
          style={{ background: '#8b5cf6' }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full opacity-[0.04] blur-3xl"
          style={{ background: '#06b6d4' }}
        />
      </div>

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Icons */}
      <motion.div
        className="flex gap-8 md:gap-14 mb-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {icons.map(({ Icon, label, color, delay }, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 40, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: delay + 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            >
              {/* Rings */}
              <motion.div
                className="absolute -inset-4 rounded-full border opacity-20"
                style={{ borderColor: color }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -inset-2 rounded-full border opacity-10"
                style={{ borderColor: color }}
                animate={{ rotate: -360 }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              />

              {/* Icon circle */}
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, ${color}20, transparent 70%)`,
                  border: `1px solid ${color}50`,
                  boxShadow: `0 0 40px ${color}20`,
                }}
              >
                <Icon className="w-7 h-7 md:w-9 md:h-9" style={{ color }} />
              </div>
            </motion.div>

            <span className="text-xs font-mono-custom tracking-widest" style={{ color }}>
              {label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Title — scramble reveal */}
      <div className="px-6 mb-4 text-center">
        <AnimatePresence>
          {(phase === 'subtitle' || phase === 'ready') && (
            <motion.h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-space leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 60%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {scrambledTitle}
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      {/* Subtitle */}
      <AnimatePresence>
        {(phase === 'subtitle' || phase === 'ready') && (
          <motion.p
            className="text-zinc-500 text-base sm:text-lg md:text-xl font-light tracking-wide text-center px-6 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Tags */}
      <AnimatePresence>
        {phase === 'ready' && (
          <motion.div
            className="flex gap-3 flex-wrap justify-center px-6 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {['React', 'JavaScript', 'CSS3', 'HTML5', 'Git'].map((tag, i) => (
              <motion.span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full border font-mono-custom"
                style={{ borderColor: 'rgba(59,130,246,0.2)', color: 'rgba(148,163,184,0.7)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.07 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll CTA */}
      <AnimatePresence>
        {phase === 'ready' && (
          <motion.div
            className="absolute bottom-10 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              onClick={onScrollStart}
              className="group flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <span className="text-xs font-mono-custom tracking-[0.2em] uppercase">Scroll to Explore</span>
              <motion.div
                className="w-6 h-10 rounded-full border border-white/15 flex items-start justify-center pt-1.5 group-hover:border-blue-500/40 transition-colors"
              >
                <motion.div
                  className="w-1 h-2.5 rounded-full bg-blue-400"
                  animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
