import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Star, Lock, Wrench } from 'lucide-react';

const featuredProject = {
  title: 'Shiyam Premium Portfolio',
  desc: 'A cinematic, award-worthy developer portfolio showcasing modern web design with premium animations, glassmorphism, and cutting-edge UI/UX.',
  url: 'https://shiyam-site.vercel.app/#',
  tags: ['React', 'Framer Motion', 'Tailwind', 'TypeScript'],
  color: '#3b82f6',
  emoji: '🏆',
};

const projects = [
  {
    title: 'Personal Portfolio',
    desc: 'Clean and minimal personal portfolio built with HTML, CSS, and JavaScript.',
    url: 'https://shiyam-persnal-webcom.netlify.app/',
    tags: ['HTML', 'CSS', 'JavaScript'],
    color: '#06b6d4',
    status: 'live',
    emoji: '💼',
    image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?w=600&h=400&fit=crop',
  },
  {
    title: 'Graphic Design Portfolio',
    desc: 'Premium graphic design showcase with a black & white classic minimal style.',
    url: 'https://mr-path.my.canva.site/design-graphic-design-portfolio-website-in-black-white-dark-classic-minimal-style',
    tags: ['Canva', 'Design', 'Portfolio'],
    color: '#8b5cf6',
    status: 'live',
    emoji: '🎨',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?w=600&h=400&fit=crop',
  },
  {
    title: 'Fruit Frenzy',
    desc: 'An interactive fruit-themed game deployed on Hugging Face Spaces.',
    url: 'https://huggingface.co/spaces/shiyam09879/fruit-frenzy',
    tags: ['Python', 'Hugging Face', 'Game'],
    color: '#f97316',
    status: 'live',
    emoji: '🍎',
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?w=600&h=400&fit=crop',
  },
  {
    title: 'Tic Tac Toe Game',
    desc: 'Classic Tic Tac Toe game built with vanilla JavaScript.',
    url: null,
    tags: ['JavaScript', 'Game', 'Logic'],
    color: '#10b981',
    status: 'contact',
    emoji: '🎮',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?w=600&h=400&fit=crop',
  },
  {
    title: 'SMS Boom',
    desc: 'A messaging tool currently under maintenance and improvements.',
    url: null,
    tags: ['Python', 'API', 'SMS'],
    color: '#ef4444',
    status: 'maintenance',
    emoji: '📱',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?w=600&h=400&fit=crop',
  },
  {
    title: 'Song Converter',
    desc: 'A tool for converting and managing songs in different formats.',
    url: 'https://songsconvater.tiiny.site/',
    tags: ['HTML', 'CSS', 'JavaScript'],
    color: '#ec4899',
    status: 'live',
    emoji: '🎵',
    image: 'https://images.pexels.com/photos/164697/pexels-photo-164697.jpeg?w=600&h=400&fit=crop',
  },
  {
    title: 'Story Hub',
    desc: 'A dark story world — a hub for creative dark fiction and storytelling.',
    url: 'https://darkstoryworld.tiiny.site/',
    tags: ['HTML', 'CSS', 'Stories'],
    color: '#6366f1',
    status: 'live',
    emoji: '📖',
    image: 'https://images.pexels.com/photos/159591/book-reading-old-155-159591.jpeg?w=600&h=400&fit=crop',
  },
  {
    title: 'Pen Code',
    desc: 'An online code editor and playground built for developers.',
    url: 'https://paradaxexe-commits.github.io/Pen-code.shiyam./',
    tags: ['JavaScript', 'Editor', 'Dev Tool'],
    color: '#f59e0b',
    status: 'live',
    emoji: '✏️',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?w=600&h=400&fit=crop',
  },
  {
    title: 'JavaScript Compiler',
    desc: 'A web-based JavaScript compiler and runtime environment.',
    url: 'https://compliers.vercel.app/',
    tags: ['JavaScript', 'Compiler', 'Dev Tool'],
    color: '#eab308',
    status: 'live',
    emoji: '⚙️',
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?w=600&h=400&fit=crop',
  },
  {
    title: 'Advanced JS Compiler',
    desc: 'Advanced JavaScript compiler with extended features and capabilities.',
    url: 'https://complier-java.vercel.app/',
    tags: ['JavaScript', 'Advanced', 'Compiler'],
    color: '#06b6d4',
    status: 'live',
    emoji: '🔧',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?w=600&h=400&fit=crop',
  },
  {
    title: 'First HTML Website',
    desc: 'My very first HTML website — where the journey began.',
    url: 'https://firsttime-own-html-jc25.vercel.app/',
    tags: ['HTML', 'CSS', 'Beginner'],
    color: '#10b981',
    status: 'live',
    emoji: '🌱',
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?w=600&h=400&fit=crop',
  },
  {
    title: 'Second HTML Website',
    desc: 'Second HTML website — improved design and structure over the first.',
    url: 'https://mysecond-html.vercel.app/',
    tags: ['HTML', 'CSS', 'Growth'],
    color: '#8b5cf6',
    status: 'live',
    emoji: '📈',
    image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?w=600&h=400&fit=crop',
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  const statusMap = {
    live: { label: 'Live', color: '#22c55e' },
    contact: { label: 'Contact Me', color: '#f59e0b' },
    maintenance: { label: 'Maintenance', color: '#ef4444' },
  };

  const status = statusMap[project.status as keyof typeof statusMap];

  return (
    <motion.div
      className="project-card group relative glass rounded-2xl border border-white/5 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ borderColor: `${project.color}30` }}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

        {/* Status badge */}
        <div
          className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: `${status.color}20`, color: status.color, border: `1px solid ${status.color}30` }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: status.color }} />
          {status.label}
        </div>

        {/* Emoji */}
        <div className="absolute top-3 left-3 text-2xl">{project.emoji}</div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold font-space text-sm mb-2 group-hover:text-blue-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-zinc-500 text-xs leading-relaxed mb-4 line-clamp-2">{project.desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full font-mono-custom"
              style={{ background: `${project.color}10`, color: project.color, border: `1px solid ${project.color}20` }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold flex-1 justify-center transition-all duration-200"
              style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}25` }}
            >
              <ExternalLink className="w-3 h-3" />
              Live Demo
            </a>
          ) : project.status === 'contact' ? (
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold flex-1 justify-center"
              style={{ background: `${status.color}15`, color: status.color, border: `1px solid ${status.color}25` }}
            >
              <Lock className="w-3 h-3" />
              Contact
            </a>
          ) : (
            <div
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold flex-1 justify-center"
              style={{ background: '#ef444415', color: '#ef4444', border: '1px solid #ef444425' }}
            >
              <Wrench className="w-3 h-3" />
              Maintenance
            </div>
          )}
        </div>
      </div>

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: `inset 0 0 30px ${project.color}08` }}
      />
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-black overflow-hidden">
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
            What I've built
          </span>
          <h2 className="section-title text-white mb-4">
            My{' '}
            <span style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Projects
            </span>
          </h2>
          <div className="w-16 h-[2px] mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded" />
        </motion.div>

        {/* Featured Project */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
            <span className="text-zinc-400 text-sm font-medium">Featured Project</span>
          </div>
          <motion.div
            className="relative glass rounded-3xl p-6 md:p-10 border overflow-hidden group"
            style={{ borderColor: 'rgba(59,130,246,0.2)' }}
            whileHover={{ borderColor: 'rgba(59,130,246,0.4)', boxShadow: '0 0 60px rgba(59,130,246,0.1)' }}
          >
            {/* Background gradient */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right, #3b82f6, transparent 60%)' }}
            />

            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <div className="text-6xl">{featuredProject.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-blue-400 font-mono-custom tracking-widest">FEATURED</span>
                  <span className="w-1 h-1 rounded-full bg-blue-400" />
                  <span className="text-xs text-green-400">Live</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black font-space text-white mb-3">
                  {featuredProject.title}
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-4">
                  {featuredProject.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full font-mono-custom"
                      style={{ background: '#3b82f615', color: '#60a5fa', border: '1px solid #3b82f625' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={featuredProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-400 transition-all duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* All Projects Grid */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-zinc-400 text-sm font-medium">All Projects</span>
          <div className="flex-1 h-[1px] bg-white/5" />
          <span className="text-xs text-zinc-600">{projects.length} projects</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
