import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[76rem] px-6 md:px-8", className)}>{children}</Tag>
  );
}

/**
 * Full-bleed section wrapper with consistent vertical rhythm.
 *
 * Top padding is a prop rather than something callers override with `pt-0`:
 * `py-*` compiles to `padding-block`, which wins over `padding-top` in the
 * cascade, so a `pt-0` class silently does nothing.
 */
export function Section({
  id,
  className,
  children,
  bleed = false,
  topPad = true,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  bleed?: boolean;
  topPad?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        topPad ? "py-24 md:py-32" : "pb-24 md:pb-32",
        className,
      )}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
