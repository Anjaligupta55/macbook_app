'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const colors = [
  {
    id: 'space-black',
    name: 'Space Black',
    swatch: '#1c1c1e',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=1200&hei=900&fmt=jpeg&qlt=90',
    glow: 'rgba(80, 80, 100, 0.4)',
    accent: '#3a3a4a',
    description: 'A bold new finish that commands attention.',
    filter: 'brightness(0.5) contrast(1.2)'
  },
  {
    id: 'silver',
    name: 'Silver',
    swatch: '#e3e3e3',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-silver-select-202310?wid=1200&hei=900&fmt=jpeg&qlt=90',
    glow: 'rgba(200, 200, 220, 0.3)',
    accent: '#c0c0c0',
    description: 'Timeless. Elegant. Iconic.',
    filter: 'brightness(1.1) saturate(0.3)'
  },
  {
    id: 'space-gray',
    name: 'Space Gray',
    swatch: '#6e6e73',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=1200&hei=900&fmt=jpeg&qlt=90',
    glow: 'rgba(110, 110, 130, 0.35)',
    accent: '#6e6e73',
    description: 'Perfectly understated, endlessly refined.',
    filter: 'brightness(0.75) saturate(0.5)'
  },
  {
    id: 'gold',
    name: 'Gold',
    swatch: '#f0d5a0',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-gold-select-202310?wid=1200&hei=900&fmt=jpeg&qlt=90',
    glow: 'rgba(240, 200, 100, 0.3)',
    accent: '#c9a84c',
    description: 'A warm, radiant finish for those who shine.',
    filter: 'sepia(0.4) saturate(1.5) brightness(1.1)'
  },
  {
    id: 'midnight',
    name: 'Midnight',
    swatch: '#1a1b2e',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-midnight-select-202310?wid=1200&hei=900&fmt=jpeg&qlt=90',
    glow: 'rgba(30, 30, 80, 0.5)',
    accent: '#2d2d6b',
    description: 'Deep, dramatic, and unmistakably Mac.',
    filter: 'hue-rotate(220deg) brightness(0.6)'
  }
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    rotateY: direction > 0 ? 15 : -15
  }),
  center: {
    x: 0,
    opacity: 1,
    rotateY: 0
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
    rotateY: direction > 0 ? -15 : 15
  })
};

export default function ColorPickerSection() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeTab, setActiveTab] = useState('Design');
  const [imageError, setImageError] = useState(false);

  const activeColor = colors[page];

  // MODE 3: Keyboard Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setDirection(1);
        setPage((prev) => (prev + 1) % colors.length);
      } else if (e.key === 'ArrowLeft') {
        setDirection(-1);
        setPage((prev) => (prev - 1 + colors.length) % colors.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipePower = offset.x * velocity.x;
    if (swipePower < -5000) {
      setDirection(1);
      setPage((page + 1) % colors.length);
    } else if (swipePower > 5000) {
      setDirection(-1);
      setPage((page - 1 + colors.length) % colors.length);
    }
  };

  const navItems = ['Overview', 'Features', 'Design', 'Tech Specs', 'Contact'];

  return (
    <section id="design" className="relative min-h-screen bg-[#000000] overflow-hidden flex flex-col items-center py-20 perspective-[2000px]">
      
      {/* Sticky Pill Nav Bar */}
      <div className="sticky top-6 z-50 mb-16 px-4">
        <nav style={{
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(20px)',
          borderRadius: '9999px',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '6px 8px',
          display: 'flex',
          gap: '4px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          {navItems.map(item => (
            <button 
              key={item}
              onClick={() => setActiveTab(item)}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                background: activeTab === item ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: activeTab === item ? 'white' : 'rgba(255,255,255,0.7)',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}
              className="hover:text-white hover:bg-white/10"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center z-10"
      >
        <h2 className="text-[50px] md:text-[72px] font-bold text-white leading-tight tracking-tight mb-2">
          Choose your finish.
        </h2>
        <p className="text-xl text-[#86868b] font-medium">
          Available in 5 stunning colors.
        </p>
      </motion.div>

      {/* Interactive MacBook Area */}
      <div className="relative w-full max-w-[1000px] h-[400px] md:h-[600px] mt-12 mb-20 flex justify-center items-center select-none perspective-[1200px]">
        
        {/* Ambient Glow */}
        <motion.div 
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '140px',
            background: `radial-gradient(ellipse, ${activeColor.glow} 0%, transparent 70%)`,
            filter: 'blur(40px)',
            transition: 'background 0.6s ease',
            pointerEvents: 'none',
            zIndex: 0
          }} 
        />

        {/* MODE 2: Swipeable Images */}
        <div className="relative w-full max-w-[800px] h-full flex justify-center items-center z-10">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="absolute w-[90vw] md:w-[800px] h-full flex justify-center items-center cursor-grab active:cursor-grabbing"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Fallback Strategy with CSS Filter */}
              {imageError ? (
                <div className="relative w-full h-full">
                  <img 
                    src="/frames/ezgif-frame-001.jpg" 
                    alt="MacBook Pro fallback"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl mix-blend-lighten"
                  />
                  <div 
                    className="absolute inset-0 w-full h-full mix-blend-color opacity-50 pointer-events-none rounded-xl"
                    style={{ background: activeColor.swatch }}
                  />
                </div>
              ) : (
                <img 
                  src={activeColor.image} 
                  alt={`${activeColor.name} MacBook Pro`}
                  draggable={false}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-contain pointer-events-none drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Color Name and Description */}
      <div className="h-24 flex flex-col items-center justify-center text-center z-10 mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-2xl font-bold text-white mb-2">{activeColor.name}</h3>
            <p className="text-[#86868b] text-sm md:text-base max-w-[300px]">{activeColor.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Swatches Row */}
      <div className="flex justify-center items-center gap-4 md:gap-6 z-10">
        {colors.map((color, index) => {
          const isSelected = page === index;
          return (
            <motion.button
              key={color.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + (index * 0.1), type: 'spring' }}
              onClick={() => {
                setDirection(index > page ? 1 : -1);
                setPage(index);
              }}
              style={{
                width: '40px',
                height: '40px',
                background: color.swatch,
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: isSelected 
                  ? '0 0 0 3px white, 0 0 0 5px transparent' 
                  : `0 0 0 0 transparent`,
                transform: isSelected ? 'scale(1.3)' : 'scale(1)',
                transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease'
              }}
              className="hover:scale-110"
              whileHover={!isSelected ? {
                scale: 1.15,
                boxShadow: `0 0 20px ${color.glow}`
              } : {}}
            >
              {/* Inner highlight for realism */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            </motion.button>
          );
        })}
      </div>

      <div className="mt-12 text-[#86868b] text-sm flex items-center gap-2 opacity-60 z-10">
        <span className="hidden md:inline">← use arrow keys, swipe, or click to explore →</span>
        <span className="md:hidden">← swipe or click to explore →</span>
      </div>
    </section>
  );
}
