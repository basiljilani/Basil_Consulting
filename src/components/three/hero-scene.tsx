"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Manifold } from "./manifold";

/**
 * Canvas host for the hero manifold.
 *
 * Rendering is paused whenever the scene scrolls out of view or the tab is
 * hidden — an idle WebGL loop is the single most expensive thing a marketing
 * page can leave running.
 */
export default function HeroScene() {
  const host = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(true);

  // Safe to read the device at init: this module is imported with `ssr: false`,
  // so it only ever evaluates in the browser.
  const [quality] = useState<"high" | "low">(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    return cores <= 4 || coarse ? "low" : "high";
  });

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let onScreen = true;
    const sync = () => setRunning(onScreen && !document.hidden);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: "120px" },
    );
    io.observe(el);

    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div ref={host} className="h-full w-full">
      <Canvas
        frameloop={running ? "always" : "never"}
        dpr={[1, quality === "high" ? 1.75 : 1.25]}
        gl={{
          antialias: false, // additive points don't benefit; saves a lot on mobile
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        style={{ pointerEvents: "none" }}
      >
        <Manifold quality={quality} intensity={0.95} />
      </Canvas>
    </div>
  );
}
