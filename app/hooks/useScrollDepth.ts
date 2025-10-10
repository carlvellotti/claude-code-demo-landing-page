'use client';

import { useEffect, useRef } from 'react';

export function useScrollDepth() {
  const milestones = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = Math.floor((scrollTop / (documentHeight - windowHeight)) * 100);

      // Track at 25%, 50%, 75%, 100%
      const thresholds = [25, 50, 75, 100];
      
      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !milestones.current.has(threshold)) {
          milestones.current.add(threshold);
          
          if (window.gtag) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'engagement',
              event_label: `${threshold}%`,
              value: threshold
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

