import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Clock } from 'lucide-react';

const certifications = [
  {
    title: 'Online Typing Certification',
    issuer: 'Typing Certification Body',
    desc: 'Verified high-accuracy alphanumeric typing proficiency — essential for developer productivity.',
    date: '2023',
    color: '#3b82f6',
    emoji: '⌨️',
    badge: 'Verified',
  },
];

export default function CertificationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="certifications" className="relative py-24 md:py-32 bg-zinc-950 overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)' }}
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
            Achievements
          </span>
          <h2 className="section-title text-white mb-4">
            <span style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Certifications
            </span>
          </h2>
          <div className="w-16 h-[2px] mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded" />
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Existing cert */}
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-6 md:p-8 border border-white/5 mb-6 group"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ borderColor: `${cert.color}30`, scale: 1.01 }}
            >
              <div className="flex items-start gap-5">
                {/* Badge */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl"
                  style={{
                    background: `${cert.color}10`,
                    border: `2px solid ${cert.color}30`,
                    boxShadow: `0 0 20px ${cert.color}10`,
                  }}
                >
                  {cert.emoji}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                    <h3 className="text-white font-bold font-space">{cert.title}</h3>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-yellow-400" />
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: cert.color, background: `${cert.color}15` }}
                      >
                        {cert.badge}
                      </span>
                    </div>
                  </div>
                  <p className="text-zinc-500 text-xs mb-1">{cert.issuer}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-3">{cert.desc}</p>
                  <span className="text-xs text-zinc-600 font-mono-custom">{cert.date}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Coming Soon card */}
          <motion.div
            className="glass rounded-2xl p-8 border border-dashed border-white/10 text-center group hover:border-blue-500/20 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div
              className="w-16 h-16 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex items-center justify-center mx-auto mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Clock className="w-8 h-8 text-blue-400/60" />
            </motion.div>
            <h3 className="text-zinc-300 font-bold font-space mb-2">More Certifications Coming Soon</h3>
            <p className="text-zinc-600 text-sm">
              Currently pursuing certifications in JavaScript, React, and Web Development. Always learning, always growing.
            </p>
            <div className="mt-6 flex justify-center gap-3 flex-wrap">
              {['JavaScript', 'React', 'Web Dev', 'DSA', 'AI/ML'].map(tag => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full border border-dashed border-blue-500/20 text-zinc-600 font-mono-custom"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
