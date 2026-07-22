"use client";

import Link from "next/link";
import { useRef } from "react";
import { ServiceGlyph } from "./service-glyph";
import { ArrowRight } from "./button";
import type { Service } from "@/lib/services";
import { cn } from "@/lib/utils";

/**
 * Card with a cursor-tracked spotlight. The pointer position is written to CSS
 * custom properties rather than React state — no re-render per mousemove.
 */
export function ServiceCard({
  service,
  className,
  size = "default",
}: {
  service: Service;
  className?: string;
  size?: "default" | "large";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <Link
      ref={ref}
      href={`/services/${service.slug}`}
      onMouseMove={handleMove}
      className={cn(
        "group panel relative isolate flex flex-col overflow-hidden rounded-2xl p-8",
        "transition-[transform,border-color] duration-500 ease-[var(--ease-out-expo)]",
        "hover:-translate-y-1 hover:border-[color-mix(in_oklab,#4dfaa2_26%,transparent)]",
        size === "large" && "md:p-10",
        className,
      )}
    >
      {/* Spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(77,250,162,0.10), transparent 70%)",
        }}
      />

      <div className="flex items-start justify-between gap-4">
        <span className="text-basil-400 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:rotate-[6deg]">
          <ServiceGlyph name={service.glyph} className={size === "large" ? "h-10 w-10" : "h-8 w-8"} />
        </span>
        <span className="translate-x-0 text-faint opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0 group-hover:text-basil-400 group-hover:opacity-100">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>

      <h3
        className={cn(
          "mt-7 font-medium tracking-[-0.02em] text-bright",
          size === "large" ? "text-2xl" : "text-lg",
        )}
      >
        {service.title}
      </h3>

      <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.14em] text-basil-400/80 uppercase">
        {service.tagline}
      </p>

      <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-pretty text-dim">
        {service.summary}
      </p>

      <div className="mt-7 flex items-center gap-2 border-t border-[var(--hairline)] pt-5 text-[0.8125rem] text-faint">
        <span>{service.engagement.timeline}</span>
        <span aria-hidden="true">·</span>
        <span>from {service.engagement.startingAt}</span>
      </div>
    </Link>
  );
}
