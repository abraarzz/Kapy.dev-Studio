/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StudioDNA } from './components/StudioDNA';
import { Starfield } from './components/Starfield';
import { ProductGallery } from './components/ProductGallery';
import { ProcessScroll } from './components/ProcessScroll';
import { Contact, Footer } from './components/Contact';
import { useEffect, useState, Suspense } from 'react';
import { motion } from 'motion/react';
import Lenis from 'lenis';

import { useProgress } from '@react-three/drei';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering3D, setIsHovering3D] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over a 3D canvas or specific interactive elements
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'canvas' || target.closest('.hover-3d-trigger')) {
        setIsHovering3D(true);
      } else {
        setIsHovering3D(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className={`custom-cursor ${isHovering3D ? 'hovering-3d' : ''}`}
      animate={{ x: mousePosition.x, y: mousePosition.y }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
    />
  );
};

const GlobalLoader = () => {
  const { active, progress } = useProgress();
  const [show, setShow] = useState(true);
  const [forceHide, setForceHide] = useState(false);

  useEffect(() => {
    // Timeout bypass: if assets don't load in 5 seconds, fade out anyway
    const timeoutBypass = setTimeout(() => {
      setForceHide(true);
      setTimeout(() => setShow(false), 500);
    }, 5000);

    return () => clearTimeout(timeoutBypass);
  }, []);

  useEffect(() => {
    if (!active && progress === 100) {
      const timeout = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [active, progress]);

  if (!show) return null;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: (active && !forceHide) ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center text-white font-mono text-sm pointer-events-none"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        <p className="tracking-widest uppercase">
          {forceHide ? 'Bypassing...' : `Initializing Assets... ${Math.round(progress)}%`}
        </p>
      </div>
    </motion.div>
  );
};

export default function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <GlobalLoader />
      <main className="relative min-h-screen bg-[#050505] text-white selection:bg-white/30">
        <CustomCursor />
        <Starfield />
        <Navbar />
        <Hero />
        <StudioDNA />
        <ProductGallery />
        <ProcessScroll />
        <Contact />
        <Footer />
        
        {/* Global Noise Overlay for texture - Animated */}
        <div className="fixed inset-[-50%] z-50 pointer-events-none noise-overlay" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
        </div>
      </main>
    </>
  );
}
