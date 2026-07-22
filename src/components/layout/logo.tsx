import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/**
 * Wordmark only — the name is the mark.
 *
 * "Basil" carries the weight and full contrast; "Consulting" steps down in both
 * weight and tone so the pair reads as one lockup with a clear hierarchy rather
 * than two words of equal shout. The descriptor is muted, not faint — dropping
 * it further makes the lockup look broken at small sizes.
 */
export function Logo({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "footer";
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-baseline whitespace-nowrap transition-opacity duration-300 hover:opacity-80",
        size === "default"
          ? "text-[1.0625rem] sm:text-[1.125rem]"
          : "text-[1.0625rem]",
        className,
      )}
      aria-label={`${siteConfig.name} — home`}
    >
      <span className="font-semibold tracking-[-0.035em] text-bright">Basil</span>
      <span className="ml-[0.3em] font-normal tracking-[-0.01em] text-[#8b929d] transition-colors duration-300 group-hover:text-dim">
        Consulting
      </span>
    </Link>
  );
}
