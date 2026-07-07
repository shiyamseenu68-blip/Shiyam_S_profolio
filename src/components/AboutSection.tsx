import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Download, Rocket, BookOpen, Brain, Target, ChevronRight } from 'lucide-react';

const stats = [
  { value: 12, label: 'Projects Completed', suffix: '+', icon: Rocket,   color: '#3b82f6' },
  { value: 15, label: 'Skills',             suffix: '+', icon: Brain,    color: '#06b6d4' },
  { value: 90, label: 'Learning Progress',  suffix: '%', icon: BookOpen, color: '#8b5cf6' },
  { value: 1,  label: 'Year Experience',    suffix: '+', icon: Target,   color: '#f59e0b' },
];

function AnimCounter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 1800, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-5xl font-black font-space" style={{ color }}>
      {count}{suffix}
    </div>
  );
}

const highlights = [
  { label: 'CGPA',     value: '6.8',     color: '#3b82f6' },
  { label: 'College',  value: 'VRSAC',   color: '#06b6d4' },
  { label: 'Degree',   value: 'BCA',     color: '#8b5cf6' },
  { label: 'Location', value: 'Chennai', color: '#f59e0b' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.08 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-36 bg-black overflow-hidden">
      {/* Parallax accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #3b82f6, #06b6d4, transparent)',
          y: bgY,
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="text-xs font-mono-custom text-blue-400 tracking-[0.3em] uppercase mb-4 block"
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={inView ? { opacity: 1, letterSpacing: '0.3em' } : {}}
            transition={{ duration: 0.8 }}
          >
            Get to know me
          </motion.span>
          <h2 className="section-title text-white mb-4">
            About{' '}
            <span style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Me
            </span>
          </h2>
          <div className="w-20 h-[2px] mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* ── Left column ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* Profile card */}
            <motion.div
              variants={itemVariants}
              className="glass rounded-2xl p-6 md:p-8 border border-white/5 mb-6 relative overflow-hidden group"
              whileHover={{ borderColor: 'rgba(59,130,246,0.15)' }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: 'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.04), transparent 60%)' }} />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
                  <img src="/images/my_image.jpeg" alt="Shiyam" className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <p className="text-white font-bold font-space">SHIYAM S</p>
                  <p className="text-zinc-500 text-sm">BCA Student · Frontend Developer</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-mono-custom">Open to opportunities</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-zinc-400 text-sm md:text-base leading-[1.8]">
                {[
                  <>I'm a passionate <span className="text-blue-400 font-semibold">Frontend Developer</span> and BCA student at Veltech Ranga Sangu Arts College, Chennai. My journey into web development started with curiosity and grew into an obsession.</>,
                  <>I love building things for the web — from static pages to interactive web apps, developer tools, and creative digital experiences. Every project teaches me something new.</>,
                  <>Currently mastering <span className="text-cyan-400 font-semibold">JavaScript</span>, strengthening <span className="text-purple-400 font-semibold">DSA</span> skills, exploring <span className="text-blue-400 font-semibold">AI integration</span>, and on the path to <span className="text-green-400 font-semibold">Full Stack Developer</span>.</>,
                ].map((para, i) => (
                  <motion.p key={i} variants={itemVariants}>{para}</motion.p>
                ))}
              </div>

              {/* Highlights grid */}
              <motion.div variants={itemVariants} className="mt-6 grid grid-cols-2 gap-3">
                {highlights.map(item => (
                  <div
                    key={item.label}
                    className="glass rounded-xl p-3 border border-white/5 hover:border-white/10 transition-colors group/item"
                  >
                    <p className="text-zinc-600 text-xs font-mono-custom">{item.label}</p>
                    <p className="text-white font-bold text-sm mt-1 group-hover/item:text-zinc-200 transition-colors">
                      {item.value}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* What I do */}
            <motion.div variants={itemVariants} className="glass rounded-2xl p-6 border border-white/5 mb-5">
              <h3 className="text-white font-bold font-space mb-4 text-sm tracking-widest uppercase">What I do</h3>
              <div className="space-y-2">
                {[
                  'Build modern, responsive websites',
                  'Create interactive web applications',
                  'Develop JavaScript projects & games',
                  'Design developer tools & compilers',
                  'Explore AI-powered web experiences',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                    <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Resume button */}
            <motion.a
              href="/Shiyam_S_Resume_pdf..pdf"
              download
              variants={itemVariants}
              className="group flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-sm text-white transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(59,130,246,0.35)' }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Download Resume
            </motion.a>
          </motion.div>

          {/* ── Right column: Stats ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-5"
          >
            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label, suffix, icon: Icon, color }, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="glass rounded-2xl p-5 md:p-6 border border-white/5 group hover:border-white/10 transition-all duration-300 relative overflow-hidden"
                  whileHover={{ scale: 1.04, y: -4 }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${color}06, transparent 70%)` }} />

                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${color}12`, border: `1px solid ${color}25` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <AnimCounter value={value} suffix={suffix} color={color} />
                  <p className="text-zinc-600 text-xs mt-1.5 font-mono-custom">{label}</p>
                </motion.div>
              ))}
            </div>

            {/* Journey quote */}
            <motion.div
              variants={itemVariants}
              className="glass rounded-2xl p-6 border border-white/5 relative overflow-hidden group"
              whileHover={{ borderColor: 'rgba(59,130,246,0.15)' }}
            >
              <div
                className="absolute left-0 top-4 bottom-4 w-[2px] rounded-r-full ml-0"
                style={{ background: 'linear-gradient(180deg, #3b82f6, #06b6d4)' }}
              />
              <div className="pl-5">
                <p className="text-5xl text-blue-400 leading-none mb-3" style={{ fontFamily: 'serif' }}>"</p>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic">
                  Building the future one line of code at a time. I believe every great developer was once a beginner who refused to give up.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-500/30">
                    <img src="/images/my_image.jpeg" alt="Shiyam" className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">Shiyam S</p>
                    <p className="text-zinc-600 text-xs font-mono-custom">Frontend Developer</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dream / Motto */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3"
            >
              {['DREAM', 'CODE', 'ACHIEVE'].map((word, i) => (
                <div
                  key={word}
                  className="glass rounded-xl py-4 border border-white/5 flex items-center justify-center group hover:border-blue-500/20 transition-all duration-300"
                  style={{ '--color': ['#3b82f6', '#06b6d4', '#8b5cf6'][i] } as React.CSSProperties}
                >
                  <span
                    className="text-xs font-black font-space tracking-widest"
                    style={{ color: ['#3b82f6', '#06b6d4', '#8b5cf6'][i] }}
                  >
                    {word}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
