import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';
import LandingSection from './components/LandingSection';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import TechStackSection from './components/TechStackSection';
import TimelineSection from './components/TimelineSection';
import CertificationsSection from './components/CertificationsSection';
import GitHubSection from './components/GitHubSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

type AppPhase = 'loading' | 'landing' | 'main';

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return mobile;
}

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('loading');
  const isMobile = useIsMobile();

  const handleLoadingComplete = () => setPhase('landing');

  const handleScrollStart = () => {
    setPhase('main');
    setTimeout(() => window.scrollTo({ top: 0 }), 80);
  };

  return (
    <>
      {!isMobile && <CustomCursor />}

      {/* Scroll progress — only visible in main phase */}
      {phase === 'main' && <ScrollProgress />}

      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'landing' && (
          <LandingSection key="landing" onScrollStart={handleScrollStart} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <Navbar />
            <main>
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <TechStackSection />
              <TimelineSection />
              <CertificationsSection />
              <GitHubSection />
              <ContactSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
