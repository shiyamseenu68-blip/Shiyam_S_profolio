import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, MessageCircle, Code2, ArrowUp } from 'lucide-react';

const socials = [
  { Icon: Github, href: 'https://github.com/shiyamseenu68-blip/', label: 'GitHub' },
  { Icon: Linkedin, href: 'http://www.linkedin.com/in/shiyam-s/', label: 'LinkedIn' },
  { Icon: Instagram, href: 'https://www.instagram.com/the_invisible_paradox', label: 'Instagram' },
  { Icon: MessageCircle, href: 'https://wa.me/918668098302', label: 'WhatsApp' },
];

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-zinc-950 border-t border-white/5 overflow-hidden">
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, #06b6d4, #8b5cf6, transparent)' }}
      />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 opacity-5 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #3b82f6, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-blue-400" />
              </div>
              <span className="font-space font-bold text-xl tracking-widest text-white">SHIYAM</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-5">
              Frontend developer crafting modern, interactive, and cinematic web experiences. Always learning. Always building.
            </p>
            <div className="flex gap-2">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl glass border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/15 transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold font-space text-sm mb-4 tracking-wide">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-zinc-500 hover:text-zinc-200 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-zinc-700 group-hover:bg-blue-500 group-hover:w-6 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold font-space text-sm mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-3">
              {[
                { label: 'Email', value: 'shiyamdev@gmail.com', href: 'mailto:shiyamdev@gmail.com' },
                { label: 'Phone', value: '+91 8668098302', href: 'tel:+918668098302' },
                { label: 'Location', value: 'Chennai, Tamil Nadu', href: null },
                { label: 'Available', value: 'For Opportunities', href: '#contact' },
              ].map(item => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="text-zinc-600 text-xs font-mono-custom w-16 flex-shrink-0 mt-0.5">{item.label}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={item.href.startsWith('#') ? (e) => { e.preventDefault(); document.querySelector(item.href!)?.scrollIntoView({ behavior: 'smooth' }); } : undefined}
                      className="text-zinc-400 hover:text-white text-sm transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-zinc-400 text-sm">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-zinc-600 text-sm">
              Made with{' '}
              <span className="text-red-400">❤️</span>
              {' '}by{' '}
              <span className="text-white font-semibold">Shiyam</span>
            </p>
            <p className="text-zinc-700 text-xs mt-1 font-mono-custom">
              Always Learning. Always Building. Keep Improving.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-700 text-xs font-mono-custom">© {new Date().getFullYear()} SHIYAM S</span>
            <motion.button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-blue-500/30 transition-all duration-200"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
