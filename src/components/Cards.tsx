import { motion } from 'motion/react';
import { Code2, Cpu, Layers } from 'lucide-react';

const services = [
  {
    title: "Custom Web Design",
    description: "Pixel-perfect, GPU-accelerated interfaces built for the modern web.",
    icon: <Code2 className="w-6 h-6" strokeWidth={1} />,
    delay: 0.4
  },
  {
    title: "AI & ML Solutions",
    description: "Intelligent systems and automated workflows powered by cutting-edge models.",
    icon: <Cpu className="w-6 h-6" strokeWidth={1} />,
    delay: 0.5
  },
  {
    title: "SaaS Development",
    description: "Scalable, secure, and high-performance architectures for your next big product.",
    icon: <Layers className="w-6 h-6" strokeWidth={1} />,
    delay: 0.6
  }
];

export const Cards = () => {
  return (
    <div className="relative z-10 max-w-6xl px-6 mx-auto pb-32">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: service.delay }}
            whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
            className="p-8 border bg-white/[0.02] border-white/10 backdrop-blur-md group relative overflow-hidden"
            style={{
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.05)"
            }}
          >
            {/* Subtle outer glow on hover */}
            <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-b from-white/5 to-transparent group-hover:opacity-100"></div>
            
            <div className="mb-6 text-white/70 group-hover:text-white transition-colors">
              {service.icon}
            </div>
            <h3 className="mb-3 text-lg font-bold tracking-tighter text-white">
              {service.title}
            </h3>
            <p className="text-sm font-mono text-white/40 leading-relaxed">
              {service.description}
            </p>
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-[1px] bg-white/30"></div>
            <div className="absolute top-0 left-0 w-[1px] h-2 bg-white/30"></div>
            <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-white/30"></div>
            <div className="absolute bottom-0 right-0 w-[1px] h-2 bg-white/30"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
