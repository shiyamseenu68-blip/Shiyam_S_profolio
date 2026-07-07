import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { name: 'HTML5', emoji: '🌐', color: '#f97316', level: 90, desc: 'Semantic markup & structure' },
  { name: 'CSS3', emoji: '🎨', color: '#3b82f6', level: 85, desc: 'Styling & animations' },
  { name: 'JavaScript', emoji: '⚡', color: '#eab308', level: 80, desc: 'Core language' },
  { name: 'Responsive Design', emoji: '📱', color: '#06b6d4', level: 85, desc: 'Mobile-first layouts' },
  { name: 'Git', emoji: '🌿', color: '#f43f5e', level: 70, desc: 'Version control' },
  { name: 'GitHub', emoji: '🐙', color: '#a78bfa', level: 75, desc: 'Collaboration platform' },
  { name: 'VS Code', emoji: '💙', color: '#0ea5e9', level: 90, desc: 'Primary IDE' },
  { name: 'Frontend Dev', emoji: '🖥️', color: '#10b981', level: 80, desc: 'UI development' },
  { name: 'DSA', emoji: '🧩', color: '#f59e0b', level: 60, desc: 'Data structures' },
  { name: 'Problem Solving', emoji: '🧠', color: '#8b5cf6', level: 75, desc: 'Logic & algorithms' },
  { name: 'Creative Thinking', emoji: '💡', color: '#ec4899', level: 85, desc: 'Innovative solutions' },
  { name: 'Quick Learner', emoji: '🚀', color: '#06b6d4', level: 95, desc: 'Fast adaptation' },
];

interface SkillCardProps {
  skill: typeof skills[0];
  index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      className="skill-card group relative glass rounded-2xl p-5 border border-white/5 cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.04,
        borderColor: `${skill.color}40`,
        transition: { duration: 0.2 },
      }}
      style={{ transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
    >
      {/* Glow background on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${skill.color}08, transparent 70%)` }}
      />

      {/* Top bar */}
      <div className="flex items-start justify-between mb-4">
        <motion.div
          className="text-3xl"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {skill.emoji}
        </motion.div>
        <div
          className="text-xs font-mono-custom font-bold px-2 py-1 rounded-lg"
          style={{ color: skill.color, background: `${skill.color}15` }}
        >
          {skill.level}%
        </div>
      </div>

      <h3 className="text-white font-bold font-space text-sm mb-1">{skill.name}</h3>
      <p className="text-zinc-500 text-xs mb-4">{skill.desc}</p>

      {/* Progress bar */}
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 + 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at top right, ${skill.color}15, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="skills" className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-mono-custom text-blue-400 tracking-widest uppercase mb-4 block">
            What I work with
          </span>
          <h2 className="section-title text-white mb-4">
            My{' '}
            <span style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Skills
            </span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-sm md:text-base">
            A collection of technologies and soft skills I've developed on my developer journey.
          </p>
          <div className="w-16 h-[2px] mx-auto mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded" />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
