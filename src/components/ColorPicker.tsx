'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const colors = [
  { id: 'spaceblack', name: 'Space Black', hex: '#1c1c1e', filter: 'brightness(0.3) contrast(1.2)' },
  { id: 'silver', name: 'Silver', hex: '#e3e3e3', filter: 'brightness(1.5) saturate(0)' },
  { id: 'spacegray', name: 'Space Gray', hex: '#6e6e73', filter: 'brightness(0.8) saturate(0)' },
  { id: 'gold', name: 'Gold', hex: '#f0d5a0', filter: 'sepia(1) hue-rotate(-20deg) saturate(1.5) brightness(1.2)' },
  { id: 'midnight', name: 'Midnight', hex: '#1a1b2e', filter: 'sepia(1) hue-rotate(180deg) saturate(2) brightness(0.4)' },
];

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <section className="py-32 bg-black flex flex-col items-center overflow-hidden">
      <div className="text-center mb-16 z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Choose your finish.</h2>
        <p className="text-xl text-gray-400">Available in 5 stunning colors.</p>
      </div>

      <div className="relative w-full max-w-4xl aspect-[16/9] mb-12 flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedColor.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex justify-center items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/frames/ezgif-frame-001.jpg" 
              alt={`MacBook Pro in ${selectedColor.name}`} 
              className="w-full max-w-3xl object-contain"
              style={{ filter: selectedColor.filter }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-6 z-10">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => setSelectedColor(color)}
            className="relative group focus:outline-none"
            aria-label={`Select ${color.name}`}
          >
            <div 
              className={`w-10 h-10 rounded-full transition-transform duration-300 ${selectedColor.id === color.id ? 'scale-110' : 'group-hover:scale-110'}`}
              style={{ backgroundColor: color.hex }}
            />
            {selectedColor.id === color.id && (
              <motion.div 
                layoutId="colorRing"
                className="absolute -inset-2 border-2 border-white/50 rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-8 text-xl font-medium text-white z-10">
        {selectedColor.name}
      </div>
    </section>
  );
}
