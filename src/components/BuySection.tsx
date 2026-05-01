'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function BuySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const models = [
    {
      name: 'MacBook Pro 14"',
      chip: 'M3',
      desc: 'The most advanced Mac laptop ever.',
      price: 'From $1,599',
    },
    {
      name: 'MacBook Pro 14"',
      chip: 'M3 Pro',
      desc: 'Extreme performance for demanding workflows.',
      price: 'From $1,999',
    },
    {
      name: 'MacBook Pro 16"',
      chip: 'M3 Max',
      desc: 'A beast for the most extreme workflows.',
      price: 'From $3,499',
    }
  ];

  return (
    <section id="buy" ref={ref} className="py-32 bg-[#1d1d1f] flex flex-col items-center px-6">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Which MacBook Pro is right for you?</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {models.map((model, i) => (
          <motion.div
            key={i}
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + (i * 0.2) }}
            className="group relative bg-black rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-transparent to-blue-500/0 group-hover:to-blue-500/10 rounded-3xl transition-colors duration-500 pointer-events-none" />
            
            <h3 className="text-2xl font-bold text-white mb-1">{model.name}</h3>
            <div className="text-lg text-[#0071e3] font-medium mb-4">{model.chip}</div>
            <p className="text-gray-400 text-sm mb-8 flex-1">{model.desc}</p>
            
            <div className="text-xl text-white font-semibold mb-6">{model.price}</div>
            
            <div className="space-y-3">
              <button className="w-full py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium transition-colors">
                Buy
              </button>
              <button className="w-full py-3 rounded-full bg-transparent hover:underline text-[#0071e3] font-medium transition-all">
                Learn more &gt;
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
