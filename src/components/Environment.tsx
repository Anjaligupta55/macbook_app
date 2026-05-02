'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Environment() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#0a2a1a] to-black overflow-hidden flex flex-col items-center">
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1200px] px-6 text-center"
      >
        <h2 className="text-[40px] md:text-[80px] font-bold text-white leading-tight tracking-tight mb-20 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">
          Our best for the planet.
        </h2>

        <div className="flex justify-center mb-20">
          {/* Animated Leaf SVG */}
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]">
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2, ease: "easeInOut" }}
              d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z" 
              stroke="#34d399" strokeWidth="1" fill="rgba(52,211,153,0.1)"
            />
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              d="M12 22V8" stroke="#34d399" strokeWidth="1"
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[900px] mx-auto">
          {[
            { stat: '100%', label: 'recycled aluminum in the enclosure' },
            { stat: '2030', label: 'goal for carbon neutrality' },
            { stat: '0', label: 'plastic packaging by 2025' },
          ].map((item, i) => (
            <motion.div 
              key={item.stat}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + (i * 0.2), duration: 0.6 }}
              className="hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="text-5xl md:text-6xl font-bold text-white mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                {item.stat}
              </div>
              <div className="text-[#86868b] text-lg max-w-[200px] mx-auto">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
