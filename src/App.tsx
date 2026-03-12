/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Cards } from './components/Cards';
import { Starfield } from './components/Starfield';
import { ProductGallery } from './components/ProductGallery';
import { ProcessScroll } from './components/ProcessScroll';
import { Contact, Footer } from './components/Contact';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

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

export default function App() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-white/30">
      <CustomCursor />
      <Starfield />
      <Navbar />
      <Hero />
      <Cards />
      <ProductGallery />
      <ProcessScroll />
      <Contact />
      <Footer />
      
      {/* Global Noise Overlay for texture - Animated */}
      <div className="fixed inset-[-50%] z-50 pointer-events-none noise-overlay" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>
    </main>
  );
}
