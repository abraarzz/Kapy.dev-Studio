import { motion } from 'motion/react';
import { Terminal, MessageSquare } from 'lucide-react';

export const Contact = () => {
  return (
    <section className="relative z-10 py-32 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Neural-Link</h2>
          <p className="font-mono text-white/50">ESTABLISH A DIRECT CONNECTION TO THE STUDIO.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Command Center Form */}
          <div className="p-8 border border-white/10 bg-white/[0.02] backdrop-blur-2xl rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Initialize Project
            </h3>
            <form className="space-y-4 font-mono text-sm">
              <div>
                <label className="block text-white/60 mb-2 uppercase text-xs tracking-widest">Entity Name</label>
                <input type="text" className="terminal-input w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/50 focus:bg-white/5 transition-colors" placeholder="Enter your name or company..." />
              </div>
              <div>
                <label className="block text-white/60 mb-2 uppercase text-xs tracking-widest">Comms Link</label>
                <input type="email" className="terminal-input w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/50 focus:bg-white/5 transition-colors" placeholder="Email address..." />
              </div>
              <div>
                <label className="block text-white/60 mb-2 uppercase text-xs tracking-widest">Transmission Data</label>
                <textarea rows={4} className="terminal-input w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/50 focus:bg-white/5 transition-colors resize-none" placeholder="Describe your objective..."></textarea>
              </div>
              <button type="button" className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white/90 transition-colors cursor-pointer">
                Transmit Data
              </button>
            </form>
          </div>

          {/* Direct Access Modules */}
          <div className="space-y-6 flex flex-col justify-center">
            {/* Discord Terminal */}
            <div className="p-6 border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-2xl rounded-2xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
                  <Terminal className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-1">Discord Terminal</h4>
                  <p className="font-mono text-indigo-300/60 text-xs mb-4">ssh join@discord.kapy.dev</p>
                  <a href="https://discord.gg/K2hbt2Kwar" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/50 text-indigo-300 text-sm font-bold uppercase tracking-wider rounded transition-colors">
                    Join the Studio
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Direct */}
            <div className="p-6 border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-2xl rounded-2xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-1">WhatsApp Direct</h4>
                  <p className="font-mono text-emerald-300/60 text-xs mb-4">Direct Secure Line: +91 69010 65636</p>
                  <a href="https://wa.me/916901065636" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 text-sm font-bold uppercase tracking-wider rounded transition-colors">
                    Start Chat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="relative z-20 border-t border-white/10 bg-[#050505] overflow-hidden">
      <div className="flex whitespace-nowrap py-3 font-mono text-xs text-white/40 uppercase tracking-widest">
        <motion.div 
          className="flex gap-16"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <span>Uptime: 99.9%</span>
          <span>Status: Ready for Dev</span>
          <span>Location: India</span>
          <span>System: Online</span>
          <span>Uptime: 99.9%</span>
          <span>Status: Ready for Dev</span>
          <span>Location: India</span>
          <span>System: Online</span>
          <span>Uptime: 99.9%</span>
          <span>Status: Ready for Dev</span>
          <span>Location: India</span>
          <span>System: Online</span>
        </motion.div>
      </div>
    </footer>
  );
};
