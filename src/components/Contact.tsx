import { motion } from 'motion/react';
import { Terminal, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'streaming' | 'success'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('streaming');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 3000);
    }, 2000);
  };

  return (
    <section className="relative z-10 py-48 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Neural-Link</h2>
          <p className="font-mono text-white/70">ESTABLISH A DIRECT CONNECTION TO THE STUDIO.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Command Center Form */}
          <div className="p-8 glass-card rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Initialize Project
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6 font-mono text-sm">
              <div>
                <label className={`block mb-2 uppercase text-xs tracking-widest transition-colors ${focusedField === 'name' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-white/60'}`}>Entity Name</label>
                  <input 
                  type="text" 
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="terminal-input w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/50 focus:bg-white/5 transition-colors focus:text-[#64D2FF] focus:drop-shadow-[0_0_8px_rgba(100,210,255,0.5)]" 
                  placeholder="Enter your name or company..." 
                  required
                />
              </div>
              <div>
                <label className={`block mb-2 uppercase text-xs tracking-widest transition-colors ${focusedField === 'email' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-white/60'}`}>Comms Link</label>
                <input 
                  type="email" 
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="terminal-input w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/50 focus:bg-white/5 transition-colors focus:text-[#64D2FF] focus:drop-shadow-[0_0_8px_rgba(100,210,255,0.5)]" 
                  placeholder="Email address..." 
                  required
                />
              </div>
              <div>
                <label className={`block mb-2 uppercase text-xs tracking-widest transition-colors ${focusedField === 'data' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-white/60'}`}>Transmission Data</label>
                <textarea 
                  rows={4} 
                  onFocus={() => setFocusedField('data')}
                  onBlur={() => setFocusedField(null)}
                  className="terminal-input w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/50 focus:bg-white/5 transition-colors resize-none focus:text-[#64D2FF] focus:drop-shadow-[0_0_8px_rgba(100,210,255,0.5)]" 
                  placeholder="Describe your objective..."
                  required
                ></textarea>
              </div>
              
              <div className="pt-2">
                {formState === 'idle' && (
                  <button type="submit" className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white/90 transition-colors cursor-pointer">
                    Transmit Data
                  </button>
                )}
                
                {formState === 'streaming' && (
                  <div className="w-full py-4 bg-white/10 border border-white/20 rounded-lg relative overflow-hidden">
                    <motion.div 
                      className="absolute top-0 left-0 bottom-0 bg-white/30"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "linear" }}
                    />
                    <div className="relative z-10 text-center text-white font-bold uppercase tracking-widest text-xs">
                      Streaming Data...
                    </div>
                  </div>
                )}

                {formState === 'success' && (
                  <div className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Transmission Received
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Direct Access Modules */}
          <div className="space-y-6 flex flex-col justify-center">
            {/* Discord Terminal */}
            <div className="p-6 glass-card bg-black rounded-2xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#5865F2] transition-colors">
                  <Terminal className="w-6 h-6 text-[#5865F2] group-hover:drop-shadow-[0_0_10px_rgba(88,101,242,0.8)] transition-all" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-1">Discord Terminal</h4>
                  <p className="font-mono text-white/50 text-xs mb-4">ssh join@discord.kapy.dev</p>
                  <a href="https://discord.gg/K2hbt2Kwar" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-white/10 hover:bg-[#5865F2] border border-white/20 hover:border-[#5865F2] text-white text-sm font-bold uppercase tracking-wider rounded transition-colors">
                    Join the Studio
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Direct */}
            <div className="p-6 glass-card bg-[#111111] rounded-2xl relative group overflow-hidden transition-all duration-300 hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#25D366] transition-colors">
                  <MessageSquare className="w-6 h-6 text-[#25D366] group-hover:drop-shadow-[0_0_10px_rgba(37,211,102,0.8)] transition-all" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-1 flex items-center gap-2">
                    WhatsApp Direct
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                    </span>
                  </h4>
                  <p className="font-mono text-white/50 text-xs mb-4">Direct Secure Line: +91 69010 65636</p>
                  <a href="https://wa.me/916901065636" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-white/10 hover:bg-[#25D366] border border-white/20 hover:border-[#25D366] text-white text-sm font-bold uppercase tracking-wider rounded transition-colors">
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
