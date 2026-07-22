"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Counts up once when scrolled into view.
 *
 * Like <Reveal>, this only arms itself if the element starts below the fold.
 * Otherwise it renders the final value immediately — so a crawler, a reduced-
 * motion user, or anyone whose JS never runs sees "94%" rather than "0%".
 */
export function Counter({
  to,
  from = 0,
  duration = 1600,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const [armed, setArmed] = useState(false);
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    if (el.getBoundingClientRect().top > window.innerHeight * 0.9) {
      setValue(from);
      setArmed(true);
    }
  }, [reduce, from]);

  useEffect(() => {
    if (!armed || !inView || reduce) return;

    let raf = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast arrival, long settle
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [armed, inView, reduce, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
