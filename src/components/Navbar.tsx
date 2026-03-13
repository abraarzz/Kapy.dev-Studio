import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  
  const paddingY = useTransform(scrollY, [0, 100], ["1rem", "0.5rem"]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const menuVariants = {
    closed: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.5, staggerChildren: 0.1, staggerDirection: -1 } },
    open: { opacity: 1, backdropFilter: "blur(25px)", transition: { duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 50, rotateX: 45 },
    open: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const links = ['Home', 'Services', 'Process', 'Neural-Link'];

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ paddingTop: paddingY, paddingBottom: paddingY }}
        className="fixed top-0 left-0 right-0 z-[10000] flex items-center justify-between px-6 border-b border-white/10 bg-[#050505]/50 backdrop-blur-md"
      >
        <motion.button 
          onClick={scrollToTop}
          style={{ scale: logoScale, transformOrigin: "left center" }}
          className="text-xl font-bold tracking-tighter text-white cursor-pointer hover:text-white/80 transition-colors"
        >
          KAPY<span className="text-white/50">.DEV</span>
        </motion.button>
        <motion.button 
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col gap-1.5 p-2 group cursor-pointer relative z-[10001]"
        >
          <motion.div 
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
            className="w-8 h-[1px] bg-white transition-all"
          />
          <motion.div 
            animate={{ opacity: isOpen ? 0 : 1 }}
            className="w-6 h-[1px] bg-white transition-all group-hover:w-8"
          />
          <motion.div 
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0, width: isOpen ? 32 : 16 }}
            className="w-4 h-[1px] bg-white transition-all group-hover:w-8"
          />
        </motion.button>
      </motion.nav>

      {/* Z-Index Portal Menu */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_50%)] pointer-events-none" />
              <div className="flex flex-col items-center gap-8 perspective-1000 relative z-10">
                {links.map((link, i) => (
                  <motion.a
                    key={link}
                    href={`#${link === 'Process' ? 'the-process' : link.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      if (link === 'Home') {
                        scrollToTop();
                      } else {
                        const targetId = link === 'Process' ? 'the-process' : link.toLowerCase();
                        const el = document.getElementById(targetId);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    variants={linkVariants}
                    whileHover={{ scale: 1.1, rotateX: 10, rotateY: -10, color: "#ffffff" }}
                    className="font-heading text-5xl md:text-7xl font-bold text-white/50 hover:text-white transition-colors cursor-pointer"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
