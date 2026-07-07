import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useTransform,
} from 'framer-motion';
import {
  Github, Linkedin, Instagram, MessageCircle,
  Download, ArrowRight, ExternalLink, CreditCard, X,
  MapPin, Briefcase, Code2,
} from 'lucide-react';
import ParticleBackground from './ParticleBackground';

/* ─── Image asset paths ────────────────────────────────────────────── */
// Image 1 — "Never look back" portrait → hero backdrop
const IMG_BG_MAIN = '/images/my_image copy copy.jpeg';

// Images 4 & 5 — professional suit photos → crossfading background set
const IMG_BG_SET = [
  '/images/ChatGPT_Image_Jun_26,_2026,_05_09_58_PM.png',
  '/images/ChatGPT_Image_Jun_26,_2026,_05_08_06_PM_-_Copy.png',
];

// Image 2 — used inside the ID card
const IMG_ID_CARD = '/images/ChatGPT_Image_Jun_26,_2026,_05_07_46_PM_(1).png';

// Image 3 — right-side floating profile photo
const IMG_PROFILE = '/images/ChatGPT_Image_Jun_26,_2026,_05_08_14_PM.png';

/* ─── Rotating titles ──────────────────────────────────────────────── */
const TITLES = [
  'Frontend Developer',
  'JavaScript Developer',
  'Creative Programmer',
  'AI Enthusiast',
  'Problem Solver',
  'Future Full Stack Dev',
  'DSA Learner',
  'GitHub Explorer',
  'Always Learning',
];

const SOCIALS = [
  { Icon: Github,        href: 'https://github.com/shiyamseenu68-blip/', label: 'GitHub',    color: '#e2e8f0' },
  { Icon: Linkedin,      href: 'http://www.linkedin.com/in/shiyam-s/',    label: 'LinkedIn',  color: '#0ea5e9' },
  { Icon: Instagram,     href: 'https://www.instagram.com/the_invisible_paradox', label: 'Instagram', color: '#ec4899' },
  { Icon: MessageCircle, href: 'https://wa.me/918668098302',              label: 'WhatsApp',  color: '#22c55e' },
];

/* ─── Crossfading background slideshow ─────────────────────────────── */
function BackgroundSlideshow() {
  // All background images: main + the set of 4th & 5th
  const SLIDES = [IMG_BG_MAIN, ...IMG_BG_SET];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent(i => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [SLIDES.length]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {SLIDES.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0 }}
          animate={{ opacity: current === i ? 0.13 : 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
      ))}
      {/* Cinematic vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(110deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.88) 45%, rgba(0,0,0,0.55) 100%)',
        }}
      />
      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundSize: '200px',
        }}
      />
    </div>
  );
}

/* ─── Premium ID Card (image 2 as full background) ─────────────────── */
function IDCard({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Blurred dark backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Lanyard + card assembly */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ y: -280, opacity: 0, rotate: -14 }}
        animate={{ y: 0,    opacity: 1, rotate: 0  }}
        exit={{   y: -280, opacity: 0, rotate: 14  }}
        transition={{ type: 'spring', stiffness: 110, damping: 13, mass: 0.8 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Lanyard hook */}
        <div className="flex flex-col items-center">
          <div
            className="w-10 h-5 rounded-t-full border-[3px] border-zinc-400 bg-zinc-800"
            style={{ borderBottom: 'none' }}
          />
          <div className="w-4 h-4 rounded-full border-2 border-zinc-300 bg-zinc-600 -mt-0.5" />
        </div>

        {/* Lanyard string */}
        <div
          className="w-[3px] h-14 rounded-full"
          style={{ background: 'linear-gradient(180deg, #6b7280, #374151)' }}
        />

        {/* The card */}
        <motion.div
          className="relative w-64 sm:w-72 rounded-2xl overflow-hidden"
          style={{
            boxShadow:
              '0 40px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.07)',
          }}
          animate={{ rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          {/* ── Image 2 fills the card ── */}
          <div className="relative h-80 sm:h-96">
            <img
              src={IMG_ID_CARD}
              alt="Shiyam S"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.88) 100%)',
              }}
            />
            {/* Top badge */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Code2 className="w-3 h-3 text-blue-400" />
                <span className="text-white text-[10px] font-mono-custom tracking-widest">
                  DEV · ID
                </span>
              </div>
              <div
                className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                style={{ boxShadow: '0 0 6px #22c55e' }}
              />
            </div>
            {/* Overlaid name on photo */}
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-black font-space text-2xl tracking-widest leading-none">
                SHIYAM
              </h3>
              <p className="text-blue-400 text-xs font-mono-custom mt-1 tracking-widest">
                FRONTEND DEVELOPER
              </p>
            </div>
          </div>

          {/* Info strip */}
          <div
            className="px-4 py-4"
            style={{
              background: 'linear-gradient(135deg, #08081a, #0d0d22)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="space-y-2 mb-3">
              {[
                { icon: Briefcase, label: 'Role',     value: 'Frontend Developer'  },
                { icon: MapPin,    label: 'Location', value: 'Chennai, India'       },
                { icon: Github,    label: 'GitHub',   value: '@shiyamseenu68-blip' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                  <span className="text-zinc-600 text-[11px]">{label}:</span>
                  <span className="text-zinc-300 text-[11px] truncate">{value}</span>
                </div>
              ))}
            </div>

            {/* Barcode */}
            <div
              className="flex items-center gap-[2px] h-7 px-3 rounded-lg overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="h-full rounded-sm flex-shrink-0"
                  style={{
                    width: [3, 1, 2, 1, 3][i % 5] + 'px',
                    background: 'rgba(255,255,255,0.25)',
                    opacity: 0.25 + ((i * 37 + 17) % 100) / 200,
                  }}
                />
              ))}
            </div>

            {/* Color footer */}
            <div
              className="h-1 rounded-full mt-3"
              style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6)' }}
            />
          </div>
        </motion.div>

        {/* Close */}
        <motion.button
          onClick={onClose}
          className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-200"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.09)',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <X className="w-4 h-4" />
          Hide Card
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Magnetic button ──────────────────────────────────────────────── */
function Mag({
  children, className, style, onClick, href, download, target, rel,
}: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void; href?: string;
  download?: boolean; target?: string; rel?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width  / 2)) * 0.3);
    y.set((e.clientY - (r.top  + r.height / 2)) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const Tag = href ? motion.a : motion.button;
  return (
    // @ts-expect-error polymorphic
    <Tag
      ref={ref}
      className={className}
      style={{ ...style, x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      href={href}
      download={download}
      target={target}
      rel={rel}
      whileTap={{ scale: 0.93 }}
    >
      {children}
    </Tag>
  );
}

/* ─── Hero Section ─────────────────────────────────────────────────── */
export default function HeroSection() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [showCard, setShowCard] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spotX = useTransform(mx, v => `${v * 100}%`);
  const spotY = useTransform(my, v => `${v * 100}%`);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setTitleIdx(i => (i + 1) % TITLES.length), 2500);
    return () => clearInterval(id);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top)  / r.height);
  }, [mx, my]);

  return (
    <>
      <AnimatePresence>
        {showCard && <IDCard key="id" onClose={() => setShowCard(false)} />}
      </AnimatePresence>

      <section
        id="home"
        ref={sectionRef}
        onMouseMove={onMouseMove}
        className="relative min-h-screen flex items-center overflow-hidden bg-black pt-20"
      >
        {/* ── Crossfading background slideshow (images 1, 4, 5) ── */}
        <BackgroundSlideshow />

        {/* Mouse spotlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(520px circle at ${spotX} ${spotY}, rgba(59,130,246,0.05), transparent 60%)`,
          }}
        />

        <ParticleBackground count={40} />

        {/* Ambient glow blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/4 -left-40 w-[28rem] h-[28rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.07), transparent)' }}
          />
          <div
            className="absolute bottom-1/3 right-0 w-72 h-72 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05), transparent)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">

            {/* ── Left: Content ── */}
            <div>
              {/* Available badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{
                  border: '1px solid rgba(34,197,94,0.25)',
                  background: 'rgba(34,197,94,0.07)',
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-mono-custom tracking-[0.2em]">
                  AVAILABLE FOR WORK
                </span>
              </motion.div>

              {/* ── SHIYAM — clamp font, never wraps ── */}
              <div className="overflow-hidden mb-2">
                <motion.h1
                  className="font-black font-space leading-[0.88] whitespace-nowrap select-none"
                  style={{
                    fontSize: 'clamp(3.2rem, 9vw, 8rem)',
                    letterSpacing: '-0.03em',
                    background:
                      'linear-gradient(140deg, #ffffff 0%, #e2e8f0 45%, #94a3b8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  initial={{ y: '115%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                  SHIYAM
                </motion.h1>
              </div>

              {/* Tagline */}
              <div className="overflow-hidden mb-5">
                <motion.p
                  className="text-zinc-600 font-mono-custom text-sm tracking-[0.25em] uppercase"
                  initial={{ y: '120%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  Dream · Code · Achieve
                </motion.p>
              </div>

              {/* Rotating title ticker */}
              <div className="h-10 mb-5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={titleIdx}
                    className="flex items-center gap-2"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0,  opacity: 1 }}
                    exit={{   y: -40, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.span
                      className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"
                      animate={{ scale: [1, 1.7, 1] }}
                      transition={{ duration: 0.5 }}
                    />
                    <span
                      className="text-xl md:text-2xl font-semibold font-space"
                      style={{
                        background: 'linear-gradient(90deg, #60a5fa, #22d3ee)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {TITLES[titleIdx]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bio */}
              <motion.p
                className="text-zinc-400 text-sm md:text-base leading-[1.8] mb-8 max-w-xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7 }}
              >
                Passionate web developer crafting modern websites, interactive applications,
                developer tools, and creative digital experiences — one line of code at a time.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-wrap gap-3 mb-8"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                <Mag
                  href="#projects"
                  onClick={e => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative overflow-hidden flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Projects
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </Mag>

                <Mag
                  onClick={() => setShowCard(true)}
                  className="group flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-zinc-300 hover:text-white transition-colors duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <CreditCard className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform duration-200" />
                  Show ID Card
                </Mag>

                <Mag
                  href="#contact"
                  onClick={e => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Hire Me
                </Mag>

                <Mag
                  href="/Shiyam_S_Resume_pdf..pdf"
                  download
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  style={{
                    border: '1px solid rgba(59,130,246,0.28)',
                    background: 'rgba(59,130,246,0.06)',
                  }}
                >
                  <Download className="w-4 h-4" />
                  Resume
                </Mag>
              </motion.div>

              {/* Social icons */}
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85 }}
              >
                {SOCIALS.map(({ Icon, href, label, color }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center group"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    whileHover={{ scale: 1.2, y: -4, borderColor: color + '40', boxShadow: `0 8px 24px ${color}22` }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.08 }}
                  >
                    <Icon className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors duration-200" />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Profile — Image 3 ── */}
            <div className="flex justify-center lg:justify-end">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.82, y: 40 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Spinning conic border ring */}
                <motion.div
                  className="absolute -inset-[2px] rounded-3xl z-0"
                  style={{
                    background:
                      'conic-gradient(from 0deg, #3b82f6, #06b6d4, #8b5cf6, #ec4899, #f59e0b, #3b82f6)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-full h-full rounded-3xl bg-black" />
                </motion.div>

                {/* Float animation wrapper */}
                <motion.div
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10"
                >
                  {/* Profile frame — Image 3 */}
                  <div
                    className="relative overflow-hidden rounded-3xl"
                    style={{
                      width: 'clamp(210px, 30vw, 280px)',
                      height: 'clamp(280px, 40vw, 380px)',
                      border: '1px solid rgba(59,130,246,0.22)',
                      boxShadow:
                        '0 0 80px rgba(59,130,246,0.12), 0 0 180px rgba(6,182,212,0.07)',
                    }}
                  >
                    <img
                      src={IMG_PROFILE}
                      alt="Shiyam S – Frontend Developer"
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Bottom vignette */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
                      }}
                    />
                    {/* Scanlines */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-[0.025]"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)',
                      }}
                    />
                    {/* Name tag */}
                    <div className="absolute bottom-4 left-3 right-3">
                      <div
                        className="rounded-xl px-4 py-2 border border-white/10"
                        style={{
                          background: 'rgba(0,0,0,0.65)',
                          backdropFilter: 'blur(14px)',
                        }}
                      >
                        <p className="text-white font-bold font-space text-sm">SHIYAM S</p>
                        <p className="text-blue-400 text-xs font-mono-custom">Frontend Developer</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating orbital dots */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: ['#3b82f6','#06b6d4','#8b5cf6','#ec4899','#f59e0b'][i],
                        boxShadow: `0 0 8px ${['#3b82f6','#06b6d4','#8b5cf6','#ec4899','#f59e0b'][i]}`,
                        top:  `${[8, 25, 55, 78, 40][i]}%`,
                        left: i < 3 ? '-22px' : '110%',
                      }}
                      animate={{ y: [0, -12, 0], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2.2 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
                    />
                  ))}

                  {/* Side badges */}
                  <motion.div
                    className="absolute -right-6 top-6 rounded-xl px-3 py-2 hidden sm:block"
                    style={{
                      background: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                  >
                    <p className="text-zinc-500 text-xs">Status</p>
                    <p className="text-green-400 text-xs font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Available
                    </p>
                  </motion.div>

                  <motion.div
                    className="absolute -left-6 bottom-24 rounded-xl px-3 py-2 hidden sm:block"
                    style={{
                      background: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    animate={{ x: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  >
                    <p className="text-zinc-500 text-xs">Location</p>
                    <p className="text-blue-400 text-xs font-semibold">Chennai, India</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            animate={{
              borderColor: [
                'rgba(255,255,255,0.12)',
                'rgba(59,130,246,0.55)',
                'rgba(255,255,255,0.12)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2.5 rounded-full bg-blue-400"
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
