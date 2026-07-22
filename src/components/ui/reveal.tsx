"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

/**
 * NOTE: "left"/"right" translate horizontally, so on a full-width element whose
 * offset exceeds the container padding they push past the viewport and cause
 * horizontal scroll on narrow screens. Reserve them for elements narrower than
 * their container; prefer "up" for anything full-bleed.
 */

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Decides whether a scroll animation is safe to run at all.
 *
 * Content ships VISIBLE and is only hidden once JS has confirmed the element is
 * still below the fold. That ordering matters:
 *
 *  - no JS, or a crawler that renders without scrolling, sees every section
 *    at full opacity instead of a blank page;
 *  - above-the-fold content never flashes, because it is never armed;
 *  - only genuinely off-screen content animates, which is the only place the
 *    effect was ever visible anyway.
 *
 * Returns [ref, armed]. Until `armed` is true, render plain markup.
 */
function useArmed<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    // A little past the fold, so partially-visible elements stay put.
    if (el.getBoundingClientRect().top > window.innerHeight * 0.9) {
      setArmed(true);
    }
  }, [enabled]);

  return [ref, armed] as const;
}

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  blur = true,
  as = "div",
  amount = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  blur?: boolean;
  as?: "div" | "span" | "li" | "section";
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const [ref, armed] = useArmed<HTMLDivElement>(!reduce);
  const { x, y } = offsets[direction];

  if (!armed) {
    const Tag = as;
    return (
      <Tag ref={ref as React.Ref<never>} className={className}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------
   Stagger
------------------------------------------------------------------ */

const StaggerContext = createContext(false);

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE },
  },
};

export function Stagger({
  children,
  className,
  amount = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const [ref, armed] = useArmed<HTMLDivElement>(!reduce);

  if (!armed) {
    return (
      <StaggerContext.Provider value={false}>
        <div ref={ref} className={className}>
          {children}
        </div>
      </StaggerContext.Provider>
    );
  }

  return (
    <StaggerContext.Provider value={true}>
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount }}
      >
        {children}
      </motion.div>
    </StaggerContext.Provider>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Only animate when the parent Stagger actually armed itself, otherwise the
  // item would sit at its `hidden` variant with nothing to orchestrate it.
  const armed = useContext(StaggerContext);

  if (!armed) return <div className={className}>{children}</div>;

  return (
    <motion.div className={cn(className)} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
