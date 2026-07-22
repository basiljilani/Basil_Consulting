import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "whitespace-nowrap transition-all duration-300 ease-[var(--ease-out-expo)] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-basil-400 text-[#00160c] hover:bg-basil-300 " +
    "shadow-[0_0_0_0_rgba(77,250,162,0.5)] hover:shadow-[0_8px_40px_-8px_rgba(77,250,162,0.55)] " +
    "hover:-translate-y-0.5",
  secondary:
    "border border-[var(--hairline-strong)] bg-white/[0.03] text-bright backdrop-blur-sm " +
    "hover:bg-white/[0.07] hover:border-[color-mix(in_oklab,#fff_28%,transparent)] hover:-translate-y-0.5",
  ghost: "text-dim hover:text-bright",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-[0.9375rem]",
};

type ButtonProps = {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

/** Arrow that nudges right on parent hover. Pair with <Button>. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn(
        "h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1",
        className,
      )}
    >
      <path
        d="M2 8h11M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
