import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink, GitBranch, Star, Users } from 'lucide-react';

const githubUsername = 'shiyamseenu68-blip';
const githubUrl = `https://github.com/${githubUsername}`;

const statsCards = [
  { label: 'Repositories', value: '12+', icon: GitBranch, color: '#3b82f6' },
  { label: 'Languages', value: 'JS · HTML · CSS', icon: Star, color: '#eab308' },
  { label: 'Followers', value: 'Growing', icon: Users, color: '#10b981' },
];

export default function GitHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const statsImgParams = `username=${githubUsername}&show_icons=true&theme=transparent&hide_border=true&title_color=60a5fa&icon_color=22d3ee&text_color=9ca3af&bg_color=00000000&border_radius=12`;
  const streakParams = `user=${githubUsername}&theme=transparent&hide_border=true&ring=3b82f6&fire=06b6d4&currStreakLabel=60a5fa&background=00000000`;
  const langsParams = `username=${githubUsername}&layout=compact&theme=transparent&hide_border=true&title_color=60a5fa&text_color=9ca3af&bg_color=00000000&border_radius=12`;

  return (
    <section id="github" className="relative py-24 md:py-32 bg-black overflow-hidden">
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
            Open Source
          </span>
          <h2 className="section-title text-white mb-4">
            GitHub{' '}
            <span style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Stats
            </span>
          </h2>
          <div className="w-16 h-[2px] mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded" />
        </motion.div>

        {/* Profile banner */}
        <motion.div
          className="glass rounded-2xl p-6 md:p-8 border border-white/5 mb-8 flex flex-col sm:flex-row items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
            <img src="/images/my_image.jpeg" alt="Shiyam GitHub" className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
              <Github className="w-4 h-4 text-zinc-400" />
              <span className="text-white font-bold font-space">@{githubUsername}</span>
            </div>
            <p className="text-zinc-500 text-sm">Frontend Developer · Always Building</p>
          </div>
          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-4 h-4" />
            View Profile
          </motion.a>
        </motion.div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {statsCards.map(({ label, value, icon: Icon, color }, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl p-4 border border-white/5 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <Icon className="w-5 h-5 mx-auto mb-2" style={{ color }} />
              <p className="text-white font-bold font-space text-sm">{value}</p>
              <p className="text-zinc-600 text-xs mt-1">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* GitHub stats images */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <motion.div
            className="glass rounded-2xl p-4 border border-white/5 overflow-hidden flex items-center justify-center"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <img
              src={`https://github-readme-stats.vercel.app/api?${statsImgParams}`}
              alt="Shiyam's GitHub Stats"
              className="w-full max-w-sm"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            className="glass rounded-2xl p-4 border border-white/5 overflow-hidden flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?${streakParams}`}
              alt="Shiyam's Streak Stats"
              className="w-full max-w-sm"
              loading="lazy"
            />
          </motion.div>
        </div>

        <motion.div
          className="glass rounded-2xl p-4 border border-white/5 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?${langsParams}`}
            alt="Top Languages"
            className="w-full max-w-sm"
            loading="lazy"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-zinc-300 text-sm font-semibold hover:border-blue-500/40 hover:text-white transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            Follow on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
