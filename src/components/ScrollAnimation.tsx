'use client';
import { useRef, useEffect, useState } from 'react';

const TOTAL_FRAMES = 216;

export default function ScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
      
      if (i === 1) {
        img.onload = () => {
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
              drawScaledImage(ctx, img, canvasRef.current);
            }
          }
        };
      }
      
      loadedImages.push(img);
    }
    
    setImages(loadedImages);
  }, []);

  const drawScaledImage = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    if (!img.complete || img.naturalWidth === 0) return;
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  // Update canvas on scroll
  useEffect(() => {
    let targetProgress = progress;
    let currentProgress = progress;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollDistance = -top;
      const scrollableDistance = height - windowHeight;

      let p = scrollDistance / scrollableDistance;
      targetProgress = Math.max(0, Math.min(1, p));
    };

    let animationFrameId: number;
    const smoothUpdate = () => {
      // Lerp for smoothness
      currentProgress += (targetProgress - currentProgress) * 0.1;

      // Stop updating if it's very close
      if (Math.abs(targetProgress - currentProgress) > 0.0001) {
        setProgress(currentProgress);

        if (images.length === TOTAL_FRAMES && canvasRef.current) {
          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(currentProgress * TOTAL_FRAMES)
          );

          const ctx = canvasRef.current.getContext('2d');
          if (ctx && images[frameIndex]) {
            const imgToDraw = images[frameIndex];
            if (imgToDraw.complete && imgToDraw.naturalWidth > 0) {
              ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
              drawScaledImage(ctx, imgToDraw, canvasRef.current);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(smoothUpdate);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    animationFrameId = requestAnimationFrame(smoothUpdate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [images, progress]);

  // Adjust canvas size
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;

        // Redraw current frame
        if (images.length > 0) {
          const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));
          const ctx = canvasRef.current.getContext('2d');
          if (ctx && images[frameIndex]) {
            const imgToDraw = images[frameIndex];
            if (imgToDraw.complete && imgToDraw.naturalWidth > 0) {
              drawScaledImage(ctx, imgToDraw, canvasRef.current);
            }
          }
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, progress]);

  return (
    <section id="overview" ref={containerRef} className="relative h-[800vh] bg-black">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Loading screen removed for instant display */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover z-0 opacity-100"
        />

        {/* Text Overlays */}
        <div className={`absolute inset-x-0 px-6 top-[15%] text-center transition-all duration-700 z-10 ${progress >= 0.1 && progress < 0.25 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl">Supercharged by M3 Pro</h2>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow-lg">The most advanced chips ever built for a personal computer.</p>
        </div>

        <div className={`absolute inset-x-0 px-6 top-[30%] text-center transition-all duration-700 z-10 ${progress >= 0.25 && progress < 0.45 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl">Up to 22 hours battery life</h2>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow-lg">Go all day. And all night.</p>
        </div>

        <div className={`absolute inset-x-0 px-6 top-[50%] text-center transition-all duration-700 z-10 ${progress >= 0.45 && progress < 0.65 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl">Liquid Retina XDR display</h2>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow-lg">The best display ever in a laptop.</p>
        </div>

        <div className={`absolute inset-x-0 px-6 top-[70%] text-center transition-all duration-700 z-10 ${progress >= 0.65 && progress < 0.85 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl">Pro connectivity, everywhere</h2>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow-lg">More ports. More possibilities.</p>
        </div>

        <div className={`absolute inset-x-0 px-6 top-[85%] text-center transition-all duration-700 z-10 ${progress >= 0.85 && progress < 0.98 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl">Built for what&apos;s next</h2>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow-lg">The ultimate pro laptop.</p>
        </div>
      </div>
    </section>
  );
}
