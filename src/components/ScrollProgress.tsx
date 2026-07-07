import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const spring = useSpring(0, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const update = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setProgress(scrolled);
      spring.set(scrolled);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [spring]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-transparent pointer-events-none">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: spring,
          background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6)',
        }}
      />
    </div>
  );
}
