'use client';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden z-20 pointer-events-none pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 text-center"
      >
        <h1 className="text-[clamp(3rem,8vw,6rem)] font-semibold tracking-tight bg-gradient-to-b from-white to-[#a2a2a2] bg-clip-text text-transparent drop-shadow-lg">
          MacBook Pro
        </h1>
        <p className="text-[clamp(1.2rem,3vw,2rem)] text-[#86868b] mt-4 drop-shadow-lg">
          Mind-blowing. Head-turning.
        </p>
      </motion.div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50 z-10">
        <p className="text-sm tracking-widest font-medium">SCROLL</p>
      </div>
    </section>
  );
}
