import type { GlyphKey } from "@/lib/services";
import { cn } from "@/lib/utils";

/**
 * Abstract line-art marks — one per service. Deliberately geometric and
 * stroke-only so they read as diagram fragments rather than icons.
 */
const paths: Record<GlyphKey, React.ReactNode> = {
  orbit: (
    <>
      <circle cx="16" cy="16" r="4.5" />
      <ellipse cx="16" cy="16" rx="13" ry="6.5" />
      <ellipse cx="16" cy="16" rx="13" ry="6.5" transform="rotate(60 16 16)" />
      <circle cx="27.5" cy="19.4" r="1.8" className="fill-current stroke-none" />
    </>
  ),
  forecast: (
    <>
      <path d="M3 24.5 10 17l5 4.5L29 7.5" />
      <path d="M22.5 7.5H29V14" />
      <path d="M3 28.5h26" strokeDasharray="2 3" />
      <circle cx="10" cy="17" r="1.6" className="fill-current stroke-none" />
      <circle cx="15" cy="21.5" r="1.6" className="fill-current stroke-none" />
    </>
  ),
  layers: (
    <>
      <path d="M16 3.5 29 10l-13 6.5L3 10l13-6.5Z" />
      <path d="M3 16.5 16 23l13-6.5" />
      <path d="M3 23 16 29.5 29 23" />
    </>
  ),
  spark: (
    <>
      <path d="M16 3v7M16 22v7M3 16h7M22 16h7" />
      <path d="M7.5 7.5l4.5 4.5M20 20l4.5 4.5M24.5 7.5 20 12M12 20l-4.5 4.5" />
      <circle cx="16" cy="16" r="3.5" />
    </>
  ),
  pipeline: (
    <>
      <rect x="3" y="12" width="7" height="8" rx="2" />
      <rect x="22" y="12" width="7" height="8" rx="2" />
      <path d="M10 16h4M18 16h4" />
      <circle cx="16" cy="16" r="2.4" />
      <path d="M16 3.5v6M16 22.5v6" strokeDasharray="2 3" />
    </>
  ),
  shield: (
    <>
      <path d="M16 3.5 27 8v9c0 6.4-4.6 10.6-11 12.5C9.6 27.6 5 23.4 5 17V8l11-4.5Z" />
      <path d="M11.5 16.2l3.2 3.3 6-6.4" />
    </>
  ),
  compass: (
    <>
      <circle cx="16" cy="16" r="12.5" />
      <path d="m20.8 11.2-2.4 7.2-7.2 2.4 2.4-7.2 7.2-2.4Z" />
      <circle cx="16" cy="16" r="1.4" className="fill-current stroke-none" />
    </>
  ),
  flow: (
    <>
      <rect x="3" y="4" width="9" height="6.5" rx="1.8" />
      <rect x="20" y="4" width="9" height="6.5" rx="1.8" />
      <rect x="11.5" y="21.5" width="9" height="6.5" rx="1.8" />
      <path d="M7.5 10.5v4a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-4" />
      <path d="M16 17.5v4" />
    </>
  ),
  graph: (
    <>
      <circle cx="16" cy="6.5" r="3" />
      <circle cx="6" cy="23" r="3" />
      <circle cx="26" cy="23" r="3" />
      <circle cx="16" cy="16.5" r="2.2" />
      <path d="M16 9.5v4.8M14.2 18.2 8.2 21.3M17.8 18.2l6 3.1M9 22.4h14" strokeDasharray="0" />
    </>
  ),
};

export function ServiceGlyph({
  name,
  className,
}: {
  name: GlyphKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      {paths[name]}
    </svg>
  );
}
