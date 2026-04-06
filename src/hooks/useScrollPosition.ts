'use client';

import { useState, useEffect } from 'react';

/**
 * Tracks the current vertical scroll position of the window.
 * Uses a passive event listener for optimal scroll performance.
 */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    function handleScroll(): void {
      setScrollY(window.scrollY);
    }

    // Set initial value
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollY;
}
