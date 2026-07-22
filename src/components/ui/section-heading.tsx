import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-2.5", className)}>
      <span className="inline-block h-1 w-1 rounded-full bg-basil-400 shadow-[0_0_8px_2px_rgba(77,250,162,0.6)]" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <Reveal direction="up" duration={0.6}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal direction="up" delay={0.08}>
        <h2
          className={cn(
            "display mt-5 text-[clamp(2rem,4.6vw,3.5rem)] text-balance text-bright",
            align === "center" && "max-w-3xl",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal direction="up" delay={0.16}>
          <p
            className={cn(
              "mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-pretty text-dim",
              align === "center" && "mx-auto",
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
