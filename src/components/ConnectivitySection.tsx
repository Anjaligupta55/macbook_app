'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BatteryCharging, Monitor, Tv, Camera } from 'lucide-react';

export default function ConnectivitySection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [hoveredPort, setHoveredPort] = useState<string | null>(null);

  const features = [
    { icon: <BatteryCharging size={28} className="text-[#0071e3]" />, title: 'MagSafe 3', desc: 'Fast charge to 50% in 30 mins' },
    { icon: <Monitor size={28} className="text-[#0071e3]" />, title: 'Thunderbolt 4', desc: 'Up to 40Gb/s data. Supports 8K.' },
    { icon: <Tv size={28} className="text-[#0071e3]" />, title: 'HDMI 2.1', desc: 'Up to 8K at 60Hz or 4K at 240Hz' },
    { icon: <Camera size={28} className="text-[#0071e3]" />, title: 'SDXC Card Slot', desc: 'UHS-II speeds. Perfect for pros.' },
  ];

  return (
    <section className="relative py-32 bg-[#0a0a0c] overflow-hidden flex flex-col items-center">
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1000px] px-6"
      >
        <h2 className="text-[40px] md:text-[60px] font-bold text-white text-center leading-tight tracking-tight mb-20">
          Pro connectivity.<br/>Everywhere you go.
        </h2>

        {/* MacBook Diagram */}
        <div className="relative w-full h-[200px] md:h-[300px] mb-24 flex items-center justify-center">
          {/* Base SVG Representation */}
          <div className="w-[80%] h-4 bg-[#1d1d1f] rounded-full relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#333]">
            {/* Left Ports */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-4">
              <div 
                className="w-6 h-2 bg-black rounded-sm cursor-pointer hover:bg-[#333] transition-colors"
                onMouseEnter={() => setHoveredPort('MagSafe')}
                onMouseLeave={() => setHoveredPort(null)}
              />
              <div 
                className="w-5 h-2 bg-black rounded-sm cursor-pointer hover:bg-[#333] transition-colors"
                onMouseEnter={() => setHoveredPort('Thunderbolt Left 1')}
                onMouseLeave={() => setHoveredPort(null)}
              />
              <div 
                className="w-5 h-2 bg-black rounded-sm cursor-pointer hover:bg-[#333] transition-colors"
                onMouseEnter={() => setHoveredPort('Thunderbolt Left 2')}
                onMouseLeave={() => setHoveredPort(null)}
              />
              <div className="w-2 h-2 rounded-full bg-black ml-2" title="3.5mm Headphone Jack"/>
            </div>

            {/* Right Ports */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-4">
              <div className="w-8 h-1 bg-black rounded-sm" title="SDXC Slot"/>
              <div className="w-6 h-2 bg-black rounded-sm" title="Thunderbolt 4"/>
              <div className="w-6 h-2 bg-black rounded-sm" title="HDMI"/>
            </div>
            
            {/* Tooltip Card */}
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={hoveredPort ? { opacity: 1, y: -40, scale: 1 } : { opacity: 0, y: 10, scale: 0.9 }}
              className="absolute left-10 -top-16 bg-white text-black px-4 py-2 rounded-xl shadow-2xl font-medium text-sm pointer-events-none z-20"
            >
              {hoveredPort}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
            </motion.div>
          </div>
          
          {/* Decorative Labels flying in */}
          {inView && (
            <>
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', delay: 0.5 }}
                className="absolute left-0 -top-10 text-[#86868b] text-sm"
              >
                MagSafe 3 &bull; Thunderbolt 4 (x2) &bull; 3.5mm
              </motion.div>
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', delay: 0.6 }}
                className="absolute right-0 -top-10 text-[#86868b] text-sm text-right"
              >
                HDMI &bull; Thunderbolt 4 &bull; SDXC
              </motion.div>
            </>
          )}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + (i * 0.1) }}
              className="bg-[#1d1d1f]/50 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-white text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-[#86868b]">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
