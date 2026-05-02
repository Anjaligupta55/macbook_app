'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function DisplayShowcase() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(percentage);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const pills = [
    '1000 nits sustained', '1600 nits peak', '1,000,000:1 contrast',
    'P3 wide color', 'True Tone', 'ProMotion 120Hz'
  ];

  return (
    <section className="relative py-32 bg-black overflow-hidden flex flex-col items-center">
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1200px] px-6 flex flex-col items-center text-center mb-16"
      >
        <h2 className="text-[50px] md:text-[80px] font-bold text-white leading-tight tracking-tight mb-2">
          Extreme Dynamic Range.
        </h2>
        <p className="text-2xl text-[#86868b] font-medium">
          Liquid Retina XDR display
        </p>
      </motion.div>

      {/* Two-Panel Interactive Demo */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative w-full max-w-[1000px] aspect-video bg-[#111] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] select-none"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onMouseLeave={() => isDragging && setIsDragging(false)}
      >
        {/* RIGHT PANEL (XDR - Base Layer) */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium border border-white/10">
            Liquid Retina XDR
          </div>
        </div>

        {/* LEFT PANEL (Standard - Clipped Layer) */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center border-r border-white/20"
          style={{ 
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
            filter: 'contrast(0.7) saturate(0.5) brightness(0.8)' // Washed out effect
          }}
        >
          <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white/70 text-sm font-medium border border-white/10">
            Standard Display
          </div>
        </div>

        {/* DRAGGER HANDLE */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize flex items-center justify-center z-10"
          style={{ left: `calc(${sliderPosition}% - 1px)` }}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          <div className="w-8 h-12 bg-white rounded-full flex items-center justify-center shadow-lg -ml-4">
            <div className="flex gap-1">
              <div className="w-[2px] h-4 bg-gray-400 rounded-full" />
              <div className="w-[2px] h-4 bg-gray-400 rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Spec Pills */}
      <div className="w-full max-w-[900px] px-6 mt-16 flex flex-wrap justify-center gap-4">
        {pills.map((pill, i) => (
          <motion.div
            key={pill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 + (i * 0.1), type: 'spring', bounce: 0.4 }}
            className="bg-[#1d1d1f] border border-white/10 text-white px-6 py-3 rounded-full font-medium hover:-translate-y-1 hover:bg-[#2d2d2f] hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all cursor-default"
          >
            {pill}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
