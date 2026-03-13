import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScroll = () => {
    const element = document.getElementById('the-process');
    if (element) {
      const offset = 100; // Account for the new gap you wanted
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-32 overflow-hidden">
      {/* 3D Emblem Container */}
      <motion.div 
        className="relative flex items-center justify-center w-64 h-64 mb-12 md:w-80 md:h-80"
        animate={{
          rotateX: -mousePosition.y,
          rotateY: mousePosition.x,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Rotating Brushed Metal Ring */}
        <motion.div 
          className="absolute inset-0 border-[1px] border-white/20 rounded-full"
          style={{ 
            boxShadow: "0 0 30px rgba(255,255,255,0.05), inset 0 0 20px rgba(255,255,255,0.05)",
            background: "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.05) 25%, transparent 50%, rgba(255,255,255,0.05) 75%, transparent 100%)"
          }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-4 border-[1px] border-white/10 rounded-full"
          animate={{ rotateZ: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Capybara Stone Sculpt */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center overflow-hidden rounded-full w-36 h-36 md:w-44 md:h-44 bg-zinc-900 border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)]">
             {/* Stone Texture Overlay */}
             <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
             
             {/* Capybara Silhouette */}
             <svg viewBox="0 0 100 100" className="relative z-10 w-24 h-24 text-zinc-300 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]" fill="currentColor">
                <path d="M 25 45 C 25 20, 45 15, 65 20 C 80 25, 85 35, 85 50 C 85 75, 65 85, 45 85 C 25 85, 15 65, 25 45 Z" />
                {/* Eye */}
                <circle cx="60" cy="35" r="3" fill="#050505" />
                {/* Snout */}
                <path d="M 75 48 C 80 48, 82 52, 80 55" stroke="#050505" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* Ear */}
                <path d="M 35 25 C 30 20, 25 25, 30 30" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
             </svg>
             
             {/* Lighting gradient (Key Light / Subsurface Scattering simulation) */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4)_0%,transparent_60%)] mix-blend-overlay"></div>
             <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-white/10 mix-blend-overlay"></div>
          </div>
        </div>
      </motion.div>

      {/* Typography */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center"
      >
        <div className="inline-block px-3 py-1 mb-6 text-xs tracking-widest uppercase border rounded-full font-mono text-white/70 border-white/10 bg-white/5 backdrop-blur-sm">
          System Initialized // v2.0.4
        </div>
        <h1 className="mb-6 text-5xl font-bold tracking-tighter text-transparent md:text-7xl lg:text-8xl bg-clip-text bg-gradient-to-b from-white to-white/40 font-heading">
          Kapy.dev Studio
        </h1>
        <p className="max-w-2xl mx-auto mb-10 text-sm leading-relaxed md:text-base font-mono text-white/70">
          ENGINEERING IMMERSIVE DIGITAL EXPERIENCES. <br className="hidden md:block"/>
          WE BUILD HIGH-PERFORMANCE SAAS, AI INTEGRATIONS, AND CYBER-AESTHETIC WEB PLATFORMS.
        </p>

        {/* CTA Button */}
        <motion.button 
          onClick={handleScroll}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,102,0.4), inset 0 0 10px rgba(0,229,255,0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="relative px-8 py-4 text-sm font-bold tracking-wide text-black uppercase transition-all bg-white rounded-full cursor-pointer group"
        >
          <span className="relative z-10 flex items-center gap-2">
            Discover Our Process
            <motion.span 
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↗
            </motion.span>
          </span>
          <div className="absolute inset-0 transition-opacity opacity-50 blur-md bg-gradient-to-r from-[#00FF66] to-[#00E5FF] rounded-full group-hover:opacity-100"></div>
        </motion.button>
        
        {/* The Hero Buffer */}
        <div className="h-[25vh]"></div>
      </motion.div>
    </div>
  );
};
