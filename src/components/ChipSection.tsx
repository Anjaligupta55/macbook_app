'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ChipSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [cpu, setCpu] = useState(0);
  const [gpu, setGpu] = useState(0);
  const [battery, setBattery] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const duration = 2000;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setCpu(Math.floor(easeOutQuart * 12));
        setGpu(Math.floor(easeOutQuart * 18));
        setBattery(Math.floor(easeOutQuart * 22));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView]);

  return (
    <section id="about" ref={ref} className="relative py-32 bg-[#000000] flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a24_0%,#000_100%)] opacity-50"></div>
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10 w-48 h-48 border border-[#333] rounded-3xl bg-[#111] flex flex-col items-center justify-center mb-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
        <div className="text-sm text-gray-400 mb-1 z-10">M3 PRO</div>
        <div className="text-4xl font-bold text-white z-10">Apple</div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-6">
        {[
          { value: cpu, label: '12-core CPU', subtext: 'Up to 20% faster than M1 Pro' },
          { value: gpu, label: '18-core GPU', subtext: 'Up to 40% faster than M1 Pro' },
          { value: battery, label: '22 hr battery', subtext: 'Longest battery life ever in a Mac' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-3xl text-center"
          >
            <div className="text-6xl font-bold bg-gradient-to-br from-[#0071e3] to-[#4facfe] bg-clip-text text-transparent mb-4">
              {stat.value}
            </div>
            <div className="text-xl text-white font-semibold mb-2">{stat.label}</div>
            <div className="text-gray-400 text-sm">{stat.subtext}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
