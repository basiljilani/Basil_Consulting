"use client";

import { useEffect, useState } from "react";

type ScrollState = {
  /** True once the user has scrolled past the threshold — drives header frosting */
  scrolled: boolean;
  /** True when scrolling up, or near the top — drives header reveal */
  visible: boolean;
};

/**
 * Reveal-on-scroll-up header behaviour.
 * rAF-throttled so we never read layout more than once a frame.
 */
export function useScrollDirection(threshold = 24): ScrollState {
  const [state, setState] = useState<ScrollState>({ scrolled: false, visible: true });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      // Ignore sub-pixel jitter and rubber-band overscroll
      if (Math.abs(delta) > 4) {
        setState({
          scrolled: y > threshold,
          visible: delta < 0 || y < 120,
        });
        lastY = y;
      } else {
        setState((prev) =>
          prev.scrolled === y > threshold ? prev : { ...prev, scrolled: y > threshold },
        );
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return state;
}
