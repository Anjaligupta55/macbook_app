'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Smartphone, RefreshCw, Clipboard } from 'lucide-react';

export default function Ecosystem() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const apps = [
    { name: 'Final Cut Pro', color: 'bg-purple-600' },
    { name: 'Logic Pro', color: 'bg-blue-600' },
    { name: 'Xcode', color: 'bg-cyan-500' },
    { name: 'DaVinci Resolve', color: 'bg-gradient-to-tr from-red-500 to-orange-500' },
    { name: 'Adobe Premiere', color: 'bg-purple-900 border-2 border-purple-400' },
    { name: 'Blender', color: 'bg-orange-500' },
    { name: 'Figma', color: 'bg-green-500' },
    { name: 'VS Code', color: 'bg-blue-500' },
  ];

  return (
    <section className="relative py-32 bg-[#1d1d1f] overflow-hidden flex flex-col items-center">
      {/* Background Fade */}
      <div className="absolute top-0 w-full h-[100px] bg-gradient-to-b from-black to-transparent pointer-events-none" />

      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1200px] px-6 text-center"
      >
        <h2 className="text-[40px] md:text-[80px] font-bold text-white leading-tight tracking-tight mb-20">
          Mac. There&apos;s nothing<br/>quite like it.
        </h2>

        {/* App Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-32 max-w-[800px] mx-auto">
          {apps.map((app, i) => (
            <div key={app.name} className="flex flex-col items-center group">
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + (i * 0.1), type: 'spring', bounce: 0.5 }}
                className={`w-20 h-20 md:w-24 md:h-24 ${app.color} rounded-2xl md:rounded-[2rem] shadow-xl group-hover:-translate-y-3 group-hover:scale-105 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 flex items-center justify-center text-white font-bold text-2xl border border-white/20`}
              >
                {app.name.charAt(0)}
              </motion.div>
              <div className="mt-3 text-xs md:text-sm text-[#a1a1a6] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {app.name}
              </div>
            </div>
          ))}
        </div>

        {/* Works with iPhone */}
        <div className="border-t border-white/10 pt-20">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-16">Works with iPhone.</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Smartphone size={32} />, title: 'Handoff', desc: 'Start an email on your iPhone and finish it on your Mac.' },
              { icon: <Clipboard size={32} />, title: 'Universal Clipboard', desc: 'Copy text on your iPhone and paste it on your Mac.' },
              { icon: <RefreshCw size={32} />, title: 'AirDrop', desc: 'Share photos and files wirelessly between your devices.' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + (i * 0.2) }}
                className="bg-[#111] p-8 rounded-3xl border border-white/5 flex flex-col items-center hover:-translate-y-2 transition-transform duration-300 shadow-lg"
              >
                <div className="text-[#0071e3] mb-6">{feature.icon}</div>
                <h4 className="text-white font-bold text-xl mb-3">{feature.title}</h4>
                <p className="text-[#86868b]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
}
