'use client';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Monitor, Zap, HardDrive, BatteryCharging, Headphones } from 'lucide-react';

export default function ConnectivitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredPort, setHoveredPort] = useState<number | null>(null);

  const ports = [
    { id: 1, name: 'MagSafe 3', icon: BatteryCharging, desc: 'Fast charging', x: '10%' },
    { id: 2, name: 'Thunderbolt 4', icon: Zap, desc: 'Up to 40Gb/s', x: '30%' },
    { id: 3, name: '3.5mm Jack', icon: Headphones, desc: 'Advanced audio', x: '50%' },
    { id: 4, name: 'SDXC', icon: HardDrive, desc: 'Fast media transfer', x: '70%' },
    { id: 5, name: 'HDMI', icon: Monitor, desc: 'Up to 8K output', x: '90%' },
  ];

  return (
    <section id="support" ref={ref} className="py-32 bg-[#000] flex flex-col items-center px-6 relative">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-24 z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Connections that matter.</h2>
        <p className="text-xl text-gray-400">The most powerful port array ever in a Mac.</p>
      </motion.div>

      <div className="relative w-full max-w-4xl h-40 border-b-4 border-gray-800 rounded-b-3xl bg-gradient-to-b from-transparent to-gray-900/30 flex items-end justify-between px-10 pb-4">
        {ports.map((port, i) => {
          const Icon = port.icon;
          return (
            <motion.div
              key={port.id}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
              className="relative"
              onMouseEnter={() => setHoveredPort(port.id)}
              onMouseLeave={() => setHoveredPort(null)}
            >
              {/* Port physical representation */}
              <div className="w-12 h-4 bg-black border border-gray-700 rounded-sm cursor-pointer hover:border-gray-500 transition-colors shadow-inner" />
              
              <AnimatePresence>
                {hoveredPort === port.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: -20, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-gray-900/90 backdrop-blur-md border border-gray-700 p-4 rounded-xl shadow-2xl z-20 pointer-events-none"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                        <Icon size={20} />
                      </div>
                      <div className="font-semibold text-white">{port.name}</div>
                    </div>
                    <div className="text-sm text-gray-400">{port.desc}</div>
                    
                    {/* Tooltip triangle */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-gray-900/90" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
