'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function MemoryBandwidth() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const tableData = [
    { label: 'CPU Cores', pro: '12', max: '16' },
    { label: 'GPU Cores', pro: '18', max: '40' },
    { label: 'Memory', pro: 'Up to 36GB', max: 'Up to 128GB' },
    { label: 'Memory Bandwidth', pro: '150GB/s', max: '400GB/s' },
    { label: 'Neural Engine', pro: '16-core', max: '16-core' },
  ];

  return (
    <section id="specs" className="relative py-32 bg-[#000000] overflow-hidden flex flex-col items-center">
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1000px] px-6"
      >
        <h2 className="text-[40px] md:text-[60px] font-bold text-white text-center leading-tight tracking-tight mb-16">
          Memory that&apos;s in a league of its own.
        </h2>

        {/* Animated Data Flow Visualization (CSS/SVG) */}
        <div className="relative w-full h-[300px] bg-[#111] rounded-3xl border border-white/10 mb-16 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
          
          <div className="relative w-[80%] h-[60%] flex justify-between items-center">
            {/* Nodes */}
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#1d1d1f] border border-[#333] flex items-center justify-center z-10 shadow-[0_0_30px_rgba(0,113,227,0.2)]">
              <span className="text-white font-bold text-sm md:text-base">CPU</span>
            </div>
            
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 p-[2px] z-10 shadow-[0_0_50px_rgba(168,85,247,0.4)]">
              <div className="w-full h-full bg-black rounded-full flex flex-col items-center justify-center text-center">
                <span className="text-white font-bold text-base md:text-xl">Unified</span>
                <span className="text-[#a1a1a6] text-[10px] md:text-xs">Memory</span>
              </div>
            </div>

            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#1d1d1f] border border-[#333] flex items-center justify-center z-10 shadow-[0_0_30px_rgba(0,113,227,0.2)]">
              <span className="text-white font-bold text-sm md:text-base">GPU</span>
            </div>

            {/* Flow Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <path d="M 15% 50% Q 50% 20% 85% 50%" fill="none" stroke="#333" strokeWidth="2" strokeDasharray="5 5" />
              <path d="M 15% 50% Q 50% 80% 85% 50%" fill="none" stroke="#333" strokeWidth="2" strokeDasharray="5 5" />
              
              {/* Particles */}
              {inView && (
                <>
                  <motion.circle r="3" fill="#0071e3"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ offsetPath: "path('M 15% 50% Q 50% 20% 85% 50%')" }}
                  />
                  <motion.circle r="3" fill="#a855f7"
                    initial={{ offsetDistance: "100%" }}
                    animate={{ offsetDistance: "0%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    style={{ offsetPath: "path('M 15% 50% Q 50% 80% 85% 50%')" }}
                  />
                  <motion.circle r="3" fill="#0071e3"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 1.8, delay: 0.8, repeat: Infinity, ease: "linear" }}
                    style={{ offsetPath: "path('M 15% 50% Q 50% 80% 85% 50%')" }}
                  />
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { value: '400GB/s', label: 'Bandwidth' },
            { value: '128GB', label: 'Max Memory' },
            { value: '3nm', label: 'Process Node' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + (i * 0.1), duration: 0.6 }}
              className="text-center hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-[#86868b] text-lg uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="w-full bg-[#111] rounded-3xl p-6 md:p-10 border border-white/5 shadow-2xl">
          <div className="grid grid-cols-3 border-b border-white/10 pb-4 mb-4">
            <div className="text-transparent">Feature</div>
            <div className="text-white font-bold text-base md:text-xl text-center">M3 Pro</div>
            <div className="text-white font-bold text-base md:text-xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">M3 Max</div>
          </div>
          
          {tableData.map((row, i) => (
            <motion.div 
              key={row.label}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 + (i * 0.1), duration: 0.5 }}
              className="grid grid-cols-3 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded-lg px-2"
            >
              <div className="text-[#a1a1a6] font-medium flex items-center text-xs md:text-base">{row.label}</div>
              <div className="text-white text-center flex items-center justify-center text-xs md:text-base">{row.pro}</div>
              <div className="text-white font-medium text-center flex items-center justify-center bg-blue-500/10 rounded-lg py-1 shadow-[inset_0_0_10px_rgba(0,113,227,0.2)] text-xs md:text-base">{row.max}</div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
