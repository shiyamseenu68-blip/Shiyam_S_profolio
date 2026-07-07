import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Instagram, MessageCircle, Send, Download, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'shiyamdev@gmail.com', href: 'mailto:shiyamdev@gmail.com', color: '#3b82f6' },
  { icon: Phone, label: 'Phone', value: '+91 8668098302', href: 'tel:+918668098302', color: '#10b981' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+91 8668098302', href: 'https://wa.me/918668098302', color: '#22c55e' },
  { icon: Github, label: 'GitHub', value: 'shiyamseenu68-blip', href: 'https://github.com/shiyamseenu68-blip/', color: '#a78bfa' },
  { icon: Linkedin, label: 'LinkedIn', value: 'shiyam-s', href: 'http://www.linkedin.com/in/shiyam-s/', color: '#0ea5e9' },
  { icon: Instagram, label: 'Instagram', value: 'the_invisible_paradox', href: 'https://www.instagram.com/the_invisible_paradox', color: '#ec4899' },
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in all fields.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase
      .from('contact_messages')
      .insert({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() });

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or contact me directly.');
    } else {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-zinc-950 overflow-hidden">
      {/* Top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(6,182,212,0.4), transparent)' }}
      />

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent 60%)' }}
        />
      </div>

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
            Get in touch
          </span>
          <h2 className="section-title text-white mb-4">
            Let's Build{' '}
            <span style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Together
            </span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-sm md:text-base">
            Have a project in mind? Want to collaborate? Or just want to say hi? I'd love to hear from you.
          </p>
          <div className="w-16 h-[2px] mx-auto mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="glass rounded-2xl p-6 md:p-8 border border-white/5">
              <h3 className="text-white font-bold font-space text-lg mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-zinc-500 text-xs font-mono-custom mb-2 tracking-wide">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200"
                    disabled={status === 'loading' || status === 'success'}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-zinc-500 text-xs font-mono-custom mb-2 tracking-wide">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200"
                    disabled={status === 'loading' || status === 'success'}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-zinc-500 text-xs font-mono-custom mb-2 tracking-wide">
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or just say hello..."
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                    disabled={status === 'loading' || status === 'success'}
                  />
                </div>

                {/* Status messages */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <span>Message sent successfully! I'll get back to you soon.</span>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: status === 'success'
                      ? 'linear-gradient(135deg, #10b981, #059669)'
                      : 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                    color: 'white',
                  }}
                  whileHover={status === 'idle' ? { scale: 1.02, boxShadow: '0 0 30px rgba(59,130,246,0.4)' } : {}}
                  whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              {/* Quick action buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <a
                  href="tel:+918668098302"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all text-sm font-medium"
                >
                  <Phone className="w-4 h-4" />
                  Call Me
                </a>
                <a
                  href="https://wa.me/918668098302"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-green-500/20 text-green-400 hover:bg-green-500/5 hover:border-green-500/30 transition-all text-sm font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              <a
                href="/Shiyam_S_Resume_pdf..pdf"
                download
                className="flex items-center justify-center gap-2 w-full mt-3 py-3 rounded-xl border border-blue-500/20 text-blue-400 hover:bg-blue-500/5 hover:border-blue-500/30 transition-all text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Right: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="space-y-4"
          >
            {/* Profile card */}
            <div className="glass rounded-2xl p-6 border border-white/5 flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
                <img src="/images/my_image.jpeg" alt="Shiyam" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <h3 className="text-white font-bold font-space">Shiyam S</h3>
                <p className="text-zinc-500 text-sm">Frontend Developer</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-mono-custom">Available for opportunities</span>
                </div>
              </div>
            </div>

            {/* Contact links */}
            <div className="grid grid-cols-1 gap-3">
              {contactInfo.map(({ icon: Icon, label, value, href, color }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="glass rounded-xl p-4 border border-white/5 flex items-center gap-4 group hover:border-opacity-30 transition-all duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.5 }}
                  whileHover={{ scale: 1.02, borderColor: `${color}30` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-zinc-500 text-xs font-mono-custom">{label}</p>
                    <p className="text-white text-sm font-medium truncate group-hover:text-zinc-200 transition-colors">
                      {value}
                    </p>
                  </div>
                  <div
                    className="w-6 h-6 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200"
                    style={{ background: `${color}15` }}
                  >
                    <svg className="w-3 h-3" style={{ color }} viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
