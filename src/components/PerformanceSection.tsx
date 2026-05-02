'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TABS = ['Video Editing', '3D Rendering', 'ML Training', 'Image Processing', 'Compiling Code'];

const BENCHMARK_DATA: Record<string, { label: string; color: string; width: string; multiplier: string }[]> = {
  'Video Editing': [
    { label: 'MacBook Pro M3 Max', color: 'from-purple-600 to-pink-500', width: '100%', multiplier: '2.5x' },
    { label: 'MacBook Pro M3 Pro', color: 'from-blue-600 to-cyan-400', width: '72%', multiplier: '1.8x' },
    { label: 'M1 Pro (Previous)', color: 'from-[#424245] to-[#55555a]', width: '45%', multiplier: '1x' },
  ],
  '3D Rendering': [
    { label: 'MacBook Pro M3 Max', color: 'from-purple-600 to-pink-500', width: '100%', multiplier: '5.3x' },
    { label: 'MacBook Pro M3 Pro', color: 'from-blue-600 to-cyan-400', width: '65%', multiplier: '2.8x' },
    { label: 'M1 Pro (Previous)', color: 'from-[#424245] to-[#55555a]', width: '35%', multiplier: '1x' },
  ],
  'ML Training': [
    { label: 'MacBook Pro M3 Max', color: 'from-purple-600 to-pink-500', width: '100%', multiplier: '3.2x' },
    { label: 'MacBook Pro M3 Pro', color: 'from-blue-600 to-cyan-400', width: '80%', multiplier: '2.1x' },
    { label: 'M1 Pro (Previous)', color: 'from-[#424245] to-[#55555a]', width: '50%', multiplier: '1x' },
  ],
  'Image Processing': [
    { label: 'MacBook Pro M3 Max', color: 'from-purple-600 to-pink-500', width: '100%', multiplier: '2.1x' },
    { label: 'MacBook Pro M3 Pro', color: 'from-blue-600 to-cyan-400', width: '85%', multiplier: '1.6x' },
    { label: 'M1 Pro (Previous)', color: 'from-[#424245] to-[#55555a]', width: '60%', multiplier: '1x' },
  ],
  'Compiling Code': [
    { label: 'MacBook Pro M3 Max', color: 'from-purple-600 to-pink-500', width: '100%', multiplier: '4x' },
    { label: 'MacBook Pro M3 Pro', color: 'from-blue-600 to-cyan-400', width: '60%', multiplier: '2.5x' },
    { label: 'M1 Pro (Previous)', color: 'from-[#424245] to-[#55555a]', width: '30%', multiplier: '1x' },
  ]
};

export default function PerformanceSection() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const activeData = BENCHMARK_DATA[activeTab];

  return (
    <section className="relative py-32 bg-[#000000] overflow-hidden flex justify-center">
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1000px] px-6 relative"
      >
        {/* Floating Badge */}
        <div className="absolute top-0 right-6 hidden md:block">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={inView ? { scale: 1, opacity: 1, rotate: -3 } : {}}
            transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
            className="bg-white text-black px-6 py-3 rounded-full font-bold shadow-[0_20px_40px_rgba(255,255,255,0.15)] text-lg"
          >
            Up to 2.5x faster
          </motion.div>
        </div>

        {/* Headline */}
        <h2 className="text-[32px] md:text-[48px] font-bold text-white leading-tight tracking-tight mb-4">
          Game-changing performance.
        </h2>
        <p className="text-xl md:text-2xl text-[#86868b] font-medium mb-16">
          Up to 2.5x faster than previous generation.
        </p>

        {/* Benchmark Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-16 border-b border-[#333] pb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 text-sm md:text-base font-medium transition-colors ${
                activeTab === tab ? 'text-white' : 'text-[#86868b] hover:text-white'
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="perf-tab-underline"
                  className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-white"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* Benchmark Bars */}
        <div className="space-y-8">
          {activeData.map((item, index) => (
            <div key={item.label + activeTab} className="relative group hover:-translate-y-1 hover:scale-[1.01] transition-transform duration-300">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[#f5f5f7] font-medium text-sm md:text-base">{item.label}</span>
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index * 0.2) + 1.2, duration: 0.8, ease: "easeOut" }}
                  className="text-white font-bold text-xl md:text-2xl drop-shadow-md"
                >
                  {item.multiplier}
                </motion.span>
              </div>
              
              {/* Capsule Container */}
              <div className="w-full bg-[#1d1d1f]/80 backdrop-blur-sm h-14 rounded-full p-[3px] relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] border border-white/5">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: item.width }}
                  transition={{ duration: 2.8, ease: [0.25, 1, 0.3, 1], delay: index * 0.2 }}
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full relative overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.15)]`}
                >
                  {/* Slow, Elegant Shimmer Effect */}
                  <motion.div
                    initial={{ x: '-150%' }}
                    animate={{ x: '250%' }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear", delay: 2.5 }}
                    className="absolute top-0 bottom-0 w-[60%] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg]"
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
