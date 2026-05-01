import { useMemo } from 'react';

export function useFrameAnimation(
  totalFrames: number,
  scrollProgress: number,
  startPercent = 0,
  endPercent = 1
) {
  return useMemo(() => {
    if (scrollProgress <= startPercent) return 0;
    if (scrollProgress >= endPercent) return totalFrames - 1;

    const range = endPercent - startPercent;
    const progressInRange = (scrollProgress - startPercent) / range;
    
    const frameIndex = Math.floor(progressInRange * totalFrames);
    return Math.min(Math.max(frameIndex, 0), totalFrames - 1);
  }, [totalFrames, scrollProgress, startPercent, endPercent]);
}
