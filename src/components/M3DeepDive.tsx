'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Zap, Database, Brain, HardDrive, Battery } from 'lucide-react';

export default function M3DeepDive() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const specs = [
    { icon: <Cpu size={24} className="text-[#a1a1a6]" />, value: '12', unit: '-core CPU', label: 'Lightning fast' },
    { icon: <Zap size={24} className="text-[#a1a1a6]" />, value: '18', unit: '-core GPU', label: 'Graphics power' },
    { icon: <Database size={24} className="text-[#a1a1a6]" />, value: '36', unit: 'GB Memory', label: 'Unified' },
    { icon: <Brain size={24} className="text-[#a1a1a6]" />, value: '16', unit: '-core NPU', label: 'Neural Engine' },
    { icon: <HardDrive size={24} className="text-[#a1a1a6]" />, value: '8', unit: 'TB SSD', label: 'Storage' },
    { icon: <Battery size={24} className="text-[#a1a1a6]" />, value: '22', unit: 'hr Battery', label: 'All-day' },
  ];

  return (
    <section className="relative py-32 bg-[#101014] overflow-hidden flex justify-center">
      {/* Background Gradient Fade Divider */}
      <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-black to-transparent pointer-events-none" />
      
      <div className="w-full max-w-[1200px] px-6">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row items-center gap-16"
        >
          
          {/* Left Side: Chip Visual */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              {/* Rotating Glow */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-blue-500/30 blur-[60px] rounded-full z-0"
              />
              
              {/* Animated SVG Chip */}
              <svg viewBox="0 0 100 100" className="w-48 h-48 md:w-64 md:h-64 z-10 drop-shadow-2xl">
                <motion.rect 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  x="10" y="10" width="80" height="80" rx="10" 
                  fill="none" stroke="url(#chipGradient)" strokeWidth="2" 
                />
                <motion.rect 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 1 }}
                  x="25" y="25" width="50" height="50" rx="5" 
                  fill="#1d1d1f" stroke="#333" strokeWidth="1" 
                />
                {/* Circuit lines */}
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ delay: 1, duration: 1.5 }}
                  d="M10 30 h15 M10 50 h15 M10 70 h15 M75 30 h15 M75 50 h15 M75 70 h15 M30 10 v15 M50 10 v15 M70 10 v15 M30 75 v15 M50 75 v15 M70 75 v15" 
                  stroke="url(#chipGradient)" strokeWidth="1.5" strokeDasharray="4 4"
                />
                <defs>
                  <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.5 }}
              className="mt-8 text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
            >
              M3 Pro
            </motion.h3>
          </div>

          {/* Right Side: Spec Cards Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 md:gap-6">
            {specs.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1d1d1f]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300"
              >
                <div className="mb-4">{spec.icon}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  {/* In a real app, use a counter. For simplicity, just text. */}
                  <span className="text-3xl md:text-4xl font-bold text-white">{spec.value}</span>
                  <span className="text-sm text-[#a1a1a6] font-medium">{spec.unit}</span>
                </div>
                <div className="text-sm text-[#86868b]">{spec.label}</div>
              </motion.div>
            ))}
          </div>

        </motion.div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="mt-20 text-center text-[#86868b] text-xl italic font-serif"
        >
          And it&apos;s built on industry-leading 3nm technology.
        </motion.div>
      </div>
    </section>
  );
}
