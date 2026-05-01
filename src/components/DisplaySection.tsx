'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function DisplaySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  const specs = [
    { title: '3456 x 2234', desc: 'resolution' },
    { title: '1000 nits', desc: 'sustained brightness' },
    { title: '1,000,000:1', desc: 'contrast ratio' },
    { title: 'ProMotion 120Hz', desc: 'adaptive refresh rate' },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-b from-[#0a0a14] to-black overflow-hidden flex flex-col md:flex-row items-center justify-center px-8 gap-16">
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <div className="relative w-full max-w-lg aspect-square flex justify-center items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/frames/ezgif-frame-001.jpg" 
            alt="MacBook Display" 
            className="w-full object-contain drop-shadow-[0_20px_40px_rgba(0,113,227,0.3)]"
          />
          <div className="absolute inset-0 bg-blue-500/10 blur-3xl -z-10 rounded-full"></div>
        </div>
      </motion.div>

      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <motion.h2 
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-white"
        >
          Extreme Dynamic Range.
        </motion.h2>

        <div className="space-y-8">
          {specs.map((spec, i) => (
            <motion.div
              key={i}
              initial={{ x: 50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + (i * 0.2) }}
              className="border-l-2 border-[#0071e3] pl-6"
            >
              <div className="text-3xl font-bold text-white mb-1">{spec.title}</div>
              <div className="text-gray-400 text-lg uppercase tracking-wider">{spec.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
