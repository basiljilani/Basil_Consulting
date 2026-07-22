"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export const PHASES = [
  {
    id: "01",
    title: "Diagnose",
    duration: "Weeks 1–3",
    body: "We inventory the decisions that actually move your P&L and put a number on each one. Most organisations discover their highest-value decision is not the one their roadmap is funding.",
    points: ["Decision inventory", "Value-at-stake model", "Data estate assessment"],
  },
  {
    id: "02",
    title: "Architect",
    duration: "Weeks 3–6",
    body: "A target architecture and a sequence, costed and dependency-ordered. We optimise the sequence for early proof rather than architectural purity — the first increment ships inside a quarter.",
    points: ["Target architecture", "Costed roadmap", "Build-versus-buy calls"],
  },
  {
    id: "03",
    title: "Build",
    duration: "Weeks 6–20",
    body: "A dedicated pod builds in your environment, in your repos, against your standards. Fortnightly increments in production — no six-month reveal, no integration cliff at the end.",
    points: ["Embedded delivery pod", "Fortnightly production increments", "Your stack, your repos"],
  },
  {
    id: "04",
    title: "Prove",
    duration: "Continuous",
    body: "Every system ships with its own measurement harness. Counterfactual and A/B evidence, attributed to the P&L line it touches, reviewed with your finance function — not a slide of claimed benefits.",
    points: ["Counterfactual measurement", "Finance-signed attribution", "Live benefit tracking"],
  },
  {
    id: "05",
    title: "Transfer",
    duration: "Final 4 weeks",
    body: "We are built to leave. Runbooks, architecture decision records, paired delivery and a named internal owner for every system. The measure of the engagement is what still runs a year later.",
    points: ["Runbooks and ADRs", "Paired handover", "Named internal owners"],
  },
];

export function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  // Spring keeps the line from twitching with trackpad scroll noise
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <Section id="approach" className="border-t border-[var(--hairline)]">
      <SectionHeading
        eyebrow="How we work"
        title="A method, not a methodology"
        lede="Five phases, run the same way every time. The deliverable is never a deck — it is a system in production with evidence attached."
      />

      <div ref={ref} className="relative mt-20">
        {/* Rail */}
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--hairline)] md:left-[calc(8rem+7px)]"
        />
        {/* Scroll-linked progress fill */}
        <motion.div
          aria-hidden="true"
          style={reduce ? { scaleY: 1 } : { scaleY: progress }}
          className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-basil-400 via-basil-500 to-signal-500 md:left-[calc(8rem+7px)]"
        />

        <div className="space-y-14 md:space-y-20">
          {PHASES.map((phase) => (
            <Reveal
              key={phase.id}
              delay={0.05}
              amount={0.4}
              className="relative grid gap-x-10 gap-y-4 pl-10 md:grid-cols-[8rem_1fr] md:pl-0"
            >
              {/* Node */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-void md:left-[8rem]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-basil-400 shadow-[0_0_10px_2px_rgba(77,250,162,0.55)]" />
              </span>

              <div className="md:pt-0.5 md:text-right md:pr-10">
                <div className="font-mono text-[0.6875rem] tracking-[0.18em] text-basil-400 uppercase">
                  Phase {phase.id}
                </div>
                <div className="mt-1.5 text-[0.8125rem] text-faint">{phase.duration}</div>
              </div>

              <div className="md:pl-10">
                <h3 className="text-2xl font-medium tracking-[-0.025em] text-bright">
                  {phase.title}
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-pretty text-dim">
                  {phase.body}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {phase.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-[var(--hairline)] bg-white/[0.02] px-3 py-1 text-[0.75rem] text-faint"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
