'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Laptop, Briefcase, Film, Plane } from 'lucide-react';

export default function BatteryRace() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const laptops = [
    { name: 'MacBook Pro M3 Max', hours: 22, color: 'text-purple-400', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]' },
    { name: 'MacBook Pro M3 Pro', hours: 18, color: 'text-blue-400', glow: '' },
    { name: 'MacBook Air M2', hours: 15, color: 'text-gray-400', glow: '' },
  ];

  return (
    <section className="relative py-32 bg-black overflow-hidden flex justify-center">
      <div className="w-full max-w-[1200px] px-6">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <h2 className="text-[40px] md:text-[70px] font-bold text-white leading-tight tracking-tight mb-4">
            All-day battery. <br/>And then some.
          </h2>
          <p className="text-xl md:text-2xl text-[#86868b] font-medium">
            Up to 22 hours — the longest battery life ever in a Mac.
          </p>
        </motion.div>

        {/* Battery Race Track */}
        <div className="relative border-l border-white/20 pl-4 md:pl-8 py-8 mb-24">
          {/* X Axis Markers */}
          <div className="absolute top-0 right-0 w-full md:w-[70%] h-full flex justify-between px-4 opacity-30 pointer-events-none">
            {[0, 5, 10, 15, 20, 22].map((mark) => (
              <div key={mark} className="h-full border-r border-white/20 relative">
                <span className="absolute -bottom-8 -translate-x-1/2 text-xs text-white/80">{mark}h</span>
              </div>
            ))}
          </div>

          <div className="space-y-12">
            {laptops.map((laptop, i) => (
              <div key={laptop.name} className="relative flex flex-col md:flex-row items-start md:items-center">
                <div className="md:w-[30%] mb-2 md:mb-0 text-[#f5f5f7] font-medium text-sm md:text-base">
                  {laptop.name}
                </div>
                <div className="w-full md:w-[70%] relative h-10 flex items-center">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${(laptop.hours / 22) * 100}%` } : {}}
                    transition={{ duration: 2, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
                    className="absolute h-[2px] bg-white/20 left-0"
                  />
                  <motion.div
                    initial={{ left: 0 }}
                    animate={inView ? { left: `calc(${(laptop.hours / 22) * 100}% - 30px)` } : {}}
                    transition={{ duration: 2, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
                    className="absolute"
                  >
                    <div className={`relative p-2 bg-[#1d1d1f] rounded-lg border border-white/10 ${laptop.glow}`}>
                      <Laptop size={24} className={laptop.color} />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-white whitespace-nowrap">
                        {laptop.hours} hrs
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use Case Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
          {[
            { icon: <Briefcase size={32} />, title: 'Work all day', desc: 'Without needing an outlet.' },
            { icon: <Film size={32} />, title: 'Stream movies', desc: 'On the longest flights.' },
            { icon: <Plane size={32} />, title: 'Travel anywhere', desc: 'True pro portability.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.5 + (i * 0.2) }}
              className="flex flex-col items-center hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-300 p-6 rounded-2xl bg-[#1d1d1f]/30"
            >
              <div className="w-16 h-16 rounded-full bg-[#1d1d1f] border border-white/10 flex items-center justify-center text-[#0071e3] mb-4">
                {item.icon}
              </div>
              <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
              <p className="text-[#86868b] text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
