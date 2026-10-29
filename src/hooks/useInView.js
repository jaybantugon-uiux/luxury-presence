import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, isVisible].
 * isVisible becomes true once the element enters the viewport
 * and stays true (fires once).
 *
 * @param {number} threshold  0–1, how much of the element must be visible
 * @param {string} rootMargin e.g. "0px 0px -60px 0px" to trigger slightly early
 */
export function useInView(threshold = 0.15, rootMargin = '0px 0px -40px 0px') {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // fire once
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
