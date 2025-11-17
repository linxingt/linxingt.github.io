import { useState, useEffect } from 'react';

export const useWindowSize = (debounceDelay = 150) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let timeoutId = null;

    const handleResize = () => {
      setIsResizing(true);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        setIsResizing(false);
      }, debounceDelay);
    };

    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [debounceDelay]);

  const breakpoints = {
    isMobile: windowSize.width <= 768,
    isTablet: windowSize.width > 768 && windowSize.width <= 1024,
    isDesktop: windowSize.width > 1024,
    isLargeDesktop: windowSize.width > 1536,
  };

  return {
    ...windowSize,
    ...breakpoints,
    isResizing,
  };
};