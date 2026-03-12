import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

export const ProcessScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rawCoinX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const rawCoinRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

  const springConfig = { stiffness: 100, damping: 20, mass: 1.5 };
  const coinX = useSpring(rawCoinX, springConfig);
  const coinRotate = useSpring(rawCoinRotate, springConfig);

  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.45], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.5, 0.65, 0.8], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 1]);
  const opacities = [opacity1, opacity2, opacity3];

  const stages = [
    { 
      id: "01", 
      name: "Discovery", 
      desc: "Mapping the architecture.",
      detail: "Architecture mapping, user-persona research, and technical feasibility scoping."
    },
    { 
      id: "02", 
      name: "Design", 
      desc: "Crafting the aesthetic.",
      detail: "High-fidelity 3D modeling, spatial UI/UX prototyping, and brand-DNA integration."
    },
    { 
      id: "03", 
      name: "Deployment", 
      desc: "Launching to the grid.",
      detail: "Vercel-edge optimization, GPU-accelerated hosting, and 24/7 intelligence monitoring."
    }
  ];

  return (
    <section id="process-section" ref={containerRef} className="relative z-10 py-48 bg-[#050505] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-32">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">The Process</h2>
        <p className="font-mono text-white/70">SYSTEMATIC EXECUTION. FROM CONCEPT TO DEPLOYMENT.</p>
      </div>

      <div className="relative h-[400px] flex items-center">
        {/* Blueprint Circuit Line */}
        <div className="absolute left-0 right-0 h-[1px] bg-white/10 top-1/2 -translate-y-1/2"></div>
        
        {/* The Gates */}
        <div className="absolute inset-0 flex justify-between items-center max-w-5xl mx-auto px-12">
          {stages.map((stage, i) => (
            <div key={i} className="relative flex flex-col items-center group">
              {/* Detail Pane */}
              <motion.div 
                className="absolute bottom-24 w-64 text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md pointer-events-none group-hover:!opacity-100 transition-opacity duration-300"
                style={{ opacity: opacities[i] }}
              >
                <p className="text-sm text-white/90 leading-relaxed font-mono">{stage.detail}</p>
              </motion.div>

              {/* Gate Node */}
              <div className="w-4 h-4 rounded-full border border-white/30 bg-[#050505] z-10 relative">
                <div className="absolute inset-1 bg-white/10 rounded-full"></div>
              </div>
              
              {/* Vertical Blueprint Line */}
              <div className="absolute top-4 w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent"></div>
              <div className="absolute bottom-4 w-[1px] h-16 bg-gradient-to-t from-white/20 to-transparent"></div>

              {/* Label */}
              <div className="absolute top-12 text-center w-48">
                <div className="font-mono text-xs text-white/40 mb-1">STAGE {stage.id}</div>
                <div className="font-bold text-xl">{stage.name}</div>
                <div className="font-mono text-[10px] text-white/30 mt-2 uppercase">{stage.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* The Traveling Kapy-Coin */}
        <div className="absolute left-0 right-0 max-w-5xl mx-auto px-12 h-full pointer-events-none">
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 w-16 h-16 -ml-8 z-20"
            style={{ left: coinX }}
          >
            <motion.div 
              className="w-full h-full rounded-full border border-white/40 bg-zinc-900 shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center relative overflow-hidden"
              style={{ rotateZ: coinRotate }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-white/20 mix-blend-overlay"></div>
              {/* Simplified Capybara Silhouette for Coin */}
              <svg viewBox="0 0 100 100" className="w-8 h-8 text-zinc-300" fill="currentColor">
                <path d="M 25 45 C 25 20, 45 15, 65 20 C 80 25, 85 35, 85 50 C 85 75, 65 85, 45 85 C 25 85, 15 65, 25 45 Z" />
                <circle cx="60" cy="35" r="4" fill="#050505" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
