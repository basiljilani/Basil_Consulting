"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * three.js is the heaviest thing on the page, so it stays out of the initial
 * bundle entirely: no SSR, loaded only after the browser goes idle, and skipped
 * altogether when the user prefers reduced motion or WebGL is unavailable.
 *
 * The static fallback below is what ships in the server HTML — it is a complete
 * visual in its own right, not a spinner, so nothing pops in.
 */
const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => null,
});

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

export function LazyHeroScene() {
  const reduce = useReducedMotion();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (!supportsWebGL()) return;

    // Defer past first paint + hydration so LCP is never blocked.
    const schedule =
      "requestIdleCallback" in window
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 1800 })
        : (cb: () => void) => window.setTimeout(cb, 320);

    let cancelled = false;
    schedule(() => {
      if (!cancelled) setMount(true);
    });
    return () => {
      cancelled = true;
    };
  }, [reduce]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* Static aurora — the SSR visual, and the permanent one under reduced motion */}
      <div
        className={[
          "absolute inset-0 transition-opacity duration-[1400ms] ease-[var(--ease-out-expo)]",
          mount ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        {/* Concentric hairlines rather than a blurred bloom — same silhouette
            as the point cloud it stands in for, but crisp. */}
        <div className="absolute left-1/2 top-1/2 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-basil-400/20" />
        <div className="absolute left-1/2 top-1/2 h-[27rem] w-[27rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" />
        <div className="absolute left-1/2 top-1/2 h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
      </div>

      {mount && (
        <div className="absolute inset-0 animate-[fade-in_1.2s_var(--ease-out-expo)_forwards]">
          <HeroScene />
        </div>
      )}
    </div>
  );
}
