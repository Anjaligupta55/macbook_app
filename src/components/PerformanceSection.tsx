'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function PerformanceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benchmarks = [
    { label: 'MacBook Pro M3 Max', value: 100, color: 'from-purple-500 to-pink-500' },
    { label: 'MacBook Pro M3 Pro', value: 70, color: 'from-blue-500 to-cyan-400' },
    { label: 'M1 Pro (Previous Gen)', value: 45, color: 'from-gray-500 to-gray-400' },
  ];

  return (
    <section ref={ref} className="py-32 bg-black flex flex-col items-center px-6">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Game-changing performance.</h2>
        <p className="text-xl text-gray-400">Up to 2.5x faster than previous generation.</p>
      </motion.div>

      <div className="w-full max-w-4xl space-y-10">
        <h3 className="text-2xl font-semibold text-white border-b border-white/10 pb-4">Video Editing (Final Cut Pro)</h3>
        
        <div className="space-y-8">
          {benchmarks.map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-48 text-gray-300 font-medium">{item.label}</div>
              <div className="flex-1 h-10 bg-white/5 rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={isInView ? { width: `${item.value}%` } : {}}
                  transition={{ duration: 1.5, delay: 0.5 + (i * 0.2), ease: [0.16, 1, 0.3, 1] }}
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
