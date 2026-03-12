import { motion } from 'motion/react';

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#050505]/50 backdrop-blur-md"
    >
      <div className="text-xl font-bold tracking-tighter text-white">
        KAPY<span className="text-white/50">.DEV</span>
      </div>
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
