import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);

        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight > 0) {
          setScrollProgress(currentScrollY / scrollHeight);
        } else {
          setScrollProgress(0);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return { scrollY, scrollProgress };
}
