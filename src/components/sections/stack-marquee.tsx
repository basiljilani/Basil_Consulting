import { Container } from "@/components/ui/container";
import { brandMarks } from "@/lib/brand-marks";

/**
 * Infinite marquee of platform marks. The list is duplicated once and
 * translated -50%, so the seam lands exactly where the copy begins — no gap,
 * no JS. Marks render monochrome to keep the row calm against the dark ground;
 * colour would turn twelve logos into visual noise.
 */
export function StackMarquee() {
  return (
    <section className="relative border-y border-[var(--hairline)] py-14">
      <Container>
        <p className="text-center font-mono text-[0.6875rem] tracking-[0.18em] text-faint uppercase">
          Engineered on the platforms you already run
        </p>
      </Container>

      <div
        className="relative mt-10 flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <ul className="animate-marquee flex shrink-0 items-center gap-12 pr-12">
          {[...brandMarks, ...brandMarks].map((brand, i) => (
            <li
              key={`${brand.label}-${i}`}
              className="flex shrink-0 items-center gap-2.5 text-[#79808c] transition-colors duration-300 hover:text-bright"
              // The second pass is a visual duplicate; keep it out of the a11y tree.
              aria-hidden={i >= brandMarks.length ? true : undefined}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-[1.1875rem] w-[1.1875rem] shrink-0"
              >
                <path d={brand.path} />
              </svg>
              <span className="text-[0.9375rem] font-medium tracking-[-0.01em] whitespace-nowrap">
                {brand.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
