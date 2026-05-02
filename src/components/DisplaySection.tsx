'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

export default function DisplaySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  // Automatic Slow Animation State
  const [frameIndex, setFrameIndex] = useState(1);
  const frameValue = useMotionValue(1);

  // Automatically loop the frames slowly back and forth when in view
  useEffect(() => {
    if (isInView) {
      const controls = animate(frameValue, 216, {
        duration: 10, // Very slow and majestic speed (10 seconds to open)
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      });

      const unsubscribe = frameValue.on("change", (latest) => {
        setFrameIndex(Math.max(1, Math.min(216, Math.round(latest))));
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, frameValue]);

  // Interactive 3D Tilt Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for an elegant, premium feel
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 3D Tilt calculations ONLY
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const specs = [
    { title: '3456 x 2234', desc: 'resolution' },
    { title: '1000 nits', desc: 'sustained brightness' },
    { title: '1,000,000:1', desc: 'contrast ratio' },
    { title: 'ProMotion 120Hz', desc: 'adaptive refresh rate' },
  ];

  const frameStr = String(frameIndex).padStart(3, '0');
  const imageSrc = `/frames/ezgif-frame-${frameStr}.jpg`;

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-b from-[#0a0a14] to-black overflow-hidden flex flex-col md:flex-row items-center justify-center px-8 gap-16 perspective-[2000px]">

      {/* 3D Interactive Container */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1, y: [0, -12, 0] } : {}}
        transition={{
          x: { duration: 1, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 1 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" } // Subtle floating animation
        }}
        className="w-full md:w-1/2 flex justify-center perspective-[1200px] z-10"
      >
        <motion.div
          className="relative w-full max-w-2xl aspect-[4/3] flex justify-center items-center cursor-ew-resize group"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Laptop Image with Blend Modes and Edge Masking */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            key={imageSrc} // Force quick updates if needed, though changing src is fine
            src={imageSrc}
            alt="MacBook Display"
            className="w-full h-full object-contain pointer-events-none mix-blend-lighten drop-shadow-[0_20px_40px_rgba(0,113,227,0.4)] transition-opacity duration-75"
            style={{
              translateZ: 60, // Pops out in 3D space
              filter: 'contrast(1.15) brightness(1.05) saturate(1.1)',
              WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 90%)',
              maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 90%)',
            }}
          />

          {/* 3D Dynamic Ambient Glow */}
          <motion.div
            className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 group-hover:bg-blue-500/20"
            style={{ translateZ: -60 }} // Pushed back in 3D space
          />
        </motion.div>
      </motion.div>

      {/* Specs Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center z-10">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-white tracking-tight"
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
              className="border-l-2 border-[#0071e3] pl-6 hover:border-white transition-colors duration-300"
            >
              <div className="text-3xl font-bold text-white mb-1">{spec.title}</div>
              <div className="text-gray-400 text-lg uppercase tracking-wider font-medium">{spec.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Cinematic Lighting */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-900/10 to-transparent pointer-events-none z-0" />
    </section>
  );
}
