"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { faqItems, type FaqItem } from "@/lib/faq";
import { cn } from "@/lib/utils";

function FaqRow({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="border-b border-[var(--hairline)]">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group flex w-full items-start justify-between gap-6 py-6 text-left"
        >
          <span
            className={cn(
              "text-[1.0625rem] font-medium transition-colors duration-300",
              isOpen ? "text-basil-300" : "text-bright group-hover:text-basil-300",
            )}
          >
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className="relative mt-2 flex h-4 w-4 shrink-0 items-center justify-center"
          >
            <span className="absolute h-px w-3.5 bg-current text-dim transition-colors group-hover:text-basil-400" />
            <span
              className={cn(
                "absolute h-px w-3.5 bg-current text-dim transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:text-basil-400",
                isOpen ? "rotate-0 opacity-0" : "rotate-90 opacity-100",
              )}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-7 leading-relaxed text-pretty text-dim">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section className="border-t border-[var(--hairline)]">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow="Questions" title="Before you get in touch" />
        </div>

        <Reveal>
          <div className="border-t border-[var(--hairline)]">
            {faqItems.map((item, i) => (
              <FaqRow
                key={item.question}
                item={item}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
