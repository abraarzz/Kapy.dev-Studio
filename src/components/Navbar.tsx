import { motion, useScroll, useTransform } from 'motion/react';

export const Navbar = () => {
  const { scrollY } = useScroll();
  
  const paddingY = useTransform(scrollY, [0, 100], ["1rem", "0.5rem"]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ paddingTop: paddingY, paddingBottom: paddingY }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 border-b border-white/10 bg-[#050505]/50 backdrop-blur-md"
    >
      <motion.div 
        style={{ scale: logoScale, transformOrigin: "left center" }}
        className="text-xl font-bold tracking-tighter text-white"
      >
        KAPY<span className="text-white/50">.DEV</span>
      </motion.div>
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col gap-1.5 p-2 group cursor-pointer"
      >
        <div className="w-6 h-[1px] bg-white transition-all group-hover:w-8"></div>
        <div className="w-4 h-[1px] bg-white transition-all group-hover:w-8"></div>
      </motion.button>
    </motion.nav>
  );
};
