'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

interface Finish {
  name: string;
  bg: string;
  imageTint: string;
  swatch: string;
  swatchBorder: string;
  textColor: string;
  glowColor: string;
  tagline: string;
  imageSrc: string;
}

const finishes: Finish[] = [
  {
    name: 'Space Black',
    bg: '#131314',
    imageTint: 'none',
    swatch: '#1c1c1e',
    swatchBorder: '#3a3a3c',
    textColor: '#f5f5f7',
    glowColor: 'rgba(100,100,120,0.35)',
    tagline: 'A bold new finish. Remarkably black.',
    imageSrc: '/color/black_mac.jpeg'
  },
  {
    name: 'Silver',
    bg: '#f0f0f0',
    imageTint: 'none',
    swatch: '#d4d4d8',
    swatchBorder: '#a1a1aa',
    textColor: '#1d1d1f',
    glowColor: 'rgba(200,200,210,0.5)',
    tagline: 'Classic. Timeless. Unmistakably Mac.',
    imageSrc: '/color/silverr_mac.jpeg'
  },
  {
    name: 'Space Gray',
    bg: '#1c1c1e',
    imageTint: 'none',
    swatch: '#6e6e73',
    swatchBorder: '#48484a',
    textColor: '#f5f5f7',
    glowColor: 'rgba(110,110,130,0.4)',
    tagline: 'Refined. Understated. Enduring.',
    imageSrc: '/color/space_grey_mac.jpeg'
  },
  {
    name: 'Gold',
    bg: '#1a100a',
    imageTint: 'none',
    swatch: '#c9a86c',
    swatchBorder: '#92704a',
    textColor: '#f5f5f7',
    glowColor: 'rgba(200,160,80,0.3)',
    tagline: 'Warm, radiant, and uniquely you.',
    imageSrc: '/color/gold_mac.jpeg'
  },
  {
    name: 'Midnight',
    bg: '#0a0a14',
    imageTint: 'none',
    swatch: '#1c1c3a',
    swatchBorder: '#2d2d6b',
    textColor: '#f5f5f7',
    glowColor: 'rgba(60,60,180,0.35)',
    tagline: 'Deep. Dramatic. Distinctly different.',
    imageSrc: '/color/midnight_mac.jpeg'
  }
];

export default function ColorStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background fixed to black

  useEffect(() => {
    finishes.forEach(f => { const img = new Image(); img.src = f.imageSrc; });

    let animationFrameId: number;
    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        const scrolled = -rect.top;
        const totalScrollable = sectionHeight - windowHeight;
        
        let progress = scrolled / totalScrollable;
        progress = Math.max(0, Math.min(1, progress));
        
        const rawIndex = progress * (finishes.length - 1);
        const newIndex = Math.round(rawIndex);
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeIndex]);

  const activeFinish = finishes[activeIndex];

  const handleSwatchClick = (index: number) => {
    if (!containerRef.current) return;
    const sectionTop = containerRef.current.offsetTop;
    const sectionHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const totalScrollable = sectionHeight - windowHeight;
    const targetScroll = sectionTop + (index / (finishes.length - 1)) * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '500vh' }}>
      <div 
        className="sticky top-0 w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center pt-24 pb-12"
      >
        
        {/* Header Text */}
        <div className="text-center z-20 px-4">
          <h2 className="text-[40px] md:text-[64px] font-bold tracking-tight text-white">
            Choose your finish.
          </h2>
          <p className="text-[19px] mt-2 font-medium text-white/60">
            Available in 5 stunning colors.
          </p>
        </div>

        {/* MacBook Images Crossfade Container */}
        <div className="relative w-full max-w-[680px] h-[250px] md:h-[400px] mt-8 mb-4 z-10 pointer-events-none" style={{ perspective: '1000px' }}>
          <AnimatePresence>
            {finishes.map((finish, i) => (
              activeIndex === i && (
                <motion.div 
                  key={finish.name}
                  initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -20, rotateX: -5 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center will-change-transform will-change-opacity"
                  style={{ perspective: '1200px' }}
                >
                  <div className="relative w-[90%] md:w-full h-full flex justify-center items-center">
                    <img 
                      src={finish.imageSrc} 
                      alt={finish.name}
                      className="w-full h-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)] rounded-xl"
                    />
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          {/* Ambient Glow */}
          <div 
            className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[300px] md:w-[400px] h-[60px] blur-[50px] md:blur-[60px] -z-10"
            style={{ 
              background: `radial-gradient(ellipse, ${activeFinish.glowColor}, transparent)`,
              transition: 'background 0.8s ease',
              animation: 'glowPulse 3s ease-in-out infinite'
            }}
          />
        </div>

        {/* Color Name Typewriter & Tagline */}
        <div className="h-24 flex flex-col items-center justify-center z-20 mb-6 text-center">
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex} className="flex flex-col items-center">
              <div className="text-[24px] md:text-[28px] font-semibold tracking-tight text-white">
                {activeFinish.name.split('').map((char, index) => (
                  <motion.span
                    key={`${activeIndex}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-[15px] md:text-[17px] mt-[6px] font-medium hidden sm:block text-white/60"
              >
                {activeFinish.tagline}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Small 26px Swatches */}
        <div className="flex gap-[12px] z-20 mb-8 items-center h-10" role="radiogroup" aria-label="Color options">
          {finishes.map((finish, i) => {
            const isSelected = activeIndex === i;
            return (
              <button
                key={finish.name}
                aria-label={finish.name}
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSwatchClick(i)}
                className="rounded-full transition-all duration-150 relative flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                style={{
                  width: '26px',
                  height: '26px',
                  background: finish.swatch,
                  border: `1.5px solid ${finish.swatchBorder}`,
                  boxShadow: isSelected 
                    ? `0 0 0 2px black, 0 0 0 4px white` 
                    : 'none',
                  transform: 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            );
          })}
        </div>

        {/* Scroll Progress Indicator */}
        <div className="w-[120px] h-[2px] bg-white/20 rounded-sm z-20 overflow-hidden relative">
          <motion.div 
            className="h-full rounded-sm absolute left-0 top-0 bg-white"
            style={{ 
              width: useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
            }}
          />
        </div>

      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scaleX(1); }
          50% { opacity: 1.0; transform: translateX(-50%) scaleX(1.15); }
        }
      `}} />
    </div>
  );
}
