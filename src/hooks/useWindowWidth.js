import { useEffect, useState } from 'react';

/**
 * Returns the current window inner width, updated on resize.
 * Debounced to 100ms to avoid excessive re-renders.
 */
export function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    let timer;
    const handler = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setWidth(window.innerWidth), 100);
    };
    window.addEventListener('resize', handler, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handler);
    };
  }, []);

  return width;
}
