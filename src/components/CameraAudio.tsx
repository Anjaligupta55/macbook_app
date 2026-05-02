'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Camera, Mic, Speaker, PlayCircle } from 'lucide-react';

export default function CameraAudio() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative py-32 bg-[#000000] overflow-hidden flex justify-center">
      <div className="w-full max-w-[1200px] px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT: Camera Showcase */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-shadow duration-500"
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">12MP Center Stage camera.</h3>
            <p className="text-[#86868b] text-lg mb-12">Always look your best in any light.</p>
          </div>

          <div className="flex-1 flex items-center justify-center mb-12 relative">
            {/* Animated Video Call UI */}
            <div className="w-full max-w-[300px] aspect-[3/4] bg-[#1d1d1f] rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl">
              {/* Person silhouette */}
              <motion.div 
                animate={{ 
                  x: [0, 20, -20, 0],
                  scale: [1, 1.1, 1.1, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-b from-blue-500 to-purple-500 blur-xl opacity-50" />
                <div className="absolute w-24 h-24 rounded-full bg-[#333] border-4 border-[#444]" />
              </motion.div>
              
              {/* Center Stage Tracking Indicator */}
              <motion.div 
                animate={{ 
                  x: [0, 20, -20, 0],
                  width: ['100px', '120px', '120px', '100px'],
                  height: ['100px', '120px', '120px', '100px']
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-[#0071e3] rounded-3xl"
              />
            </div>
          </div>

          <ul className="space-y-4">
            <li className="flex items-center gap-4 text-[#f5f5f7]">
              <Camera className="text-[#0071e3]" size={20} /> 1080p FaceTime HD
            </li>
            <li className="flex items-center gap-4 text-[#f5f5f7]">
              <div className="w-5 h-5 rounded-full border-2 border-[#0071e3] flex items-center justify-center text-[10px] text-[#0071e3] font-bold">2x</div>
              Optical zoom
            </li>
          </ul>
        </motion.div>

        {/* RIGHT: Audio Showcase */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-shadow duration-500"
        >
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Six-speaker<br/>sound system.</h3>
              <p className="text-[#86868b] text-lg">Room-filling Spatial Audio.</p>
            </div>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-[#0071e3] hover:text-white transition-colors"
            >
              <PlayCircle size={40} className={isPlaying ? 'animate-pulse' : ''} />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center gap-2 mb-12 h-[200px]">
            {/* Animated Sound Wave Bars */}
            {[1, 2, 3, 4, 5, 6].map((bar) => (
              <motion.div
                key={bar}
                animate={{
                  height: isPlaying 
                    ? [40, Math.random() * 150 + 50, 40] 
                    : 40
                }}
                transition={{
                  duration: isPlaying ? 0.5 + (bar * 0.1) : 1,
                  repeat: isPlaying ? Infinity : 0,
                  repeatType: 'reverse'
                }}
                className="w-8 md:w-12 bg-gradient-to-t from-purple-500 to-[#0071e3] rounded-full"
              />
            ))}
          </div>

          <ul className="space-y-4">
            <li className="flex items-center gap-4 text-[#f5f5f7]">
              <Speaker className="text-[#0071e3]" size={20} /> Force-cancelling woofers
            </li>
            <li className="flex items-center gap-4 text-[#f5f5f7]">
              <Mic className="text-[#0071e3]" size={20} /> Studio-quality mics
            </li>
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
