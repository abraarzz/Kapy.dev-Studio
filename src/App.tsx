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

export default function App() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-white/30">
      <Starfield />
      <Navbar />
      <Hero />
      <Cards />
      <ProductGallery />
      <ProcessScroll />
      <Contact />
      <Footer />
      
      {/* Global Noise Overlay for texture */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>
    </main>
  );
}
