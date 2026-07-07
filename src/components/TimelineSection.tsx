import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const milestones = [
  {
    year: '2022',
    title: 'Started HTML',
    desc: 'Began my journey with the basics of web development — structuring the web with HTML.',
    color: '#f97316',
    emoji: '🌱',
  },
  {
    year: '2022',
    title: 'Learned CSS',
    desc: 'Discovered the power of styling — layouts, animations, and visual design.',
    color: '#3b82f6',
    emoji: '🎨',
  },
  {
    year: '2023',
    title: 'JavaScript',
    desc: 'Dove into the language of the web — logic, interactivity, and DOM manipulation.',
    color: '#eab308',
    emoji: '⚡',
  },
  {
    year: '2023',
    title: 'Git & Version Control',
    desc: 'Learned to track code changes professionally using Git for organized development.',
    color: '#f43f5e',
    emoji: '🌿',
  },
  {
    year: '2023',
    title: 'GitHub',
    desc: 'Started sharing code publicly, exploring open source, and building a developer presence.',
    color: '#a78bfa',
    emoji: '🐙',
  },
  {
    year: '2024',
    title: 'Portfolio Websites',
    desc: 'Built and deployed multiple portfolio websites showcasing my skills and work.',
    color: '#06b6d4',
    emoji: '💼',
  },
  {
    year: '2024',
    title: 'Games & Experiments',
    desc: 'Created interactive browser games — Tic Tac Toe, Fruit Frenzy, and more.',
    color: '#10b981',
    emoji: '🎮',
  },
  {
    year: '2024',
    title: 'Developer Tools',
    desc: 'Built code compilers, editors, and useful tools for the developer community.',
    color: '#f59e0b',
    emoji: '🔧',
  },
  {
    year: '2025',
    title: 'Exploring AI',
    desc: 'Integrating AI into projects and learning how artificial intelligence enhances web apps.',
    color: '#ec4899',
    emoji: '🤖',
  },
  {
    year: '2025+',
    title: 'Full Stack Developer',
    desc: 'The ultimate goal — mastering backend, databases, and becoming a complete full stack developer.',
    color: '#8b5cf6',
    emoji: '🚀',
    future: true,
  },
];

export default function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section id="journey" className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full opacity-10"
          style={{ background: 'linear-gradient(180deg, transparent, #3b82f6, #06b6d4, #8b5cf6, transparent)' }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-mono-custom text-blue-400 tracking-widest uppercase mb-4 block">
            My story
          </span>
          <h2 className="section-title text-white mb-4">
            Developer{' '}
            <span style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Journey
            </span>
          </h2>
          <div className="w-16 h-[2px] mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: 'linear-gradient(180deg, transparent, #1e40af50, #0e7490aa, #5b21b650, transparent)' }}
          />

          <div className="space-y-8 md:space-y-12">
            {milestones.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-4 md:gap-8`}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      className="glass rounded-2xl p-5 md:p-6 border border-white/5 group hover:border-opacity-30 transition-all duration-300"
                      whileHover={{ borderColor: `${milestone.color}30`, scale: 1.02 }}
                      style={{ opacity: milestone.future ? 0.7 : 1 }}
                    >
                      <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                        <span
                          className="text-xs font-mono-custom font-bold px-2 py-0.5 rounded"
                          style={{ color: milestone.color, background: `${milestone.color}15` }}
                        >
                          {milestone.year}
                        </span>
                        {milestone.future && (
                          <span className="text-xs text-zinc-500 italic">upcoming</span>
                        )}
                      </div>
                      <h3 className="text-white font-bold font-space mb-2 flex items-center gap-2">
                        {!isLeft && <span>{milestone.emoji}</span>}
                        {milestone.title}
                        {isLeft && <span className="md:ml-auto">{milestone.emoji}</span>}
                      </h3>
                      <p className="text-zinc-500 text-sm leading-relaxed">{milestone.desc}</p>
                    </motion.div>
                  </div>

                  {/* Center dot - only on md+ */}
                  <div className="hidden md:flex relative z-10 flex-shrink-0">
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                      style={{
                        background: `${milestone.color}15`,
                        border: `2px solid ${milestone.color}40`,
                        boxShadow: `0 0 20px ${milestone.color}20`,
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 + 0.2, type: 'spring', bounce: 0.4 }}
                      whileHover={{ scale: 1.2, boxShadow: `0 0 30px ${milestone.color}40` }}
                    >
                      {milestone.emoji}
                    </motion.div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
