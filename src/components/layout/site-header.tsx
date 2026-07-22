"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./logo";
import { Button, ArrowRight } from "@/components/ui/button";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { scrolled, visible } = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: visible || menuOpen ? 0 : "-100%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "transition-all duration-500 ease-[var(--ease-out-expo)]",
            scrolled && !menuOpen
              ? "border-b border-[var(--hairline)] bg-black/60 backdrop-blur-xl backdrop-saturate-150"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <div className="mx-auto flex h-[4.5rem] w-full max-w-[76rem] items-center justify-between px-6 md:px-8">
            <Logo />

            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
              {primaryNav.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                      active ? "text-bright" : "text-dim hover:text-bright",
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              {/* Visibility lives on the wrapper: `hidden` on the Button itself
                  would collide with the base `inline-flex` display utility. */}
              <span className="hidden sm:block">
                <Button href="/contact" size="sm">
                  Book a briefing
                  <ArrowRight />
                </Button>
              </span>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--hairline)] text-bright transition-colors hover:bg-white/5 md:hidden"
              >
                <span className="sr-only">Menu</span>
                <span
                  className={cn(
                    "absolute h-px w-4 bg-current transition-all duration-300 ease-[var(--ease-out-expo)]",
                    menuOpen ? "rotate-45" : "-translate-y-1",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-4 bg-current transition-all duration-300 ease-[var(--ease-out-expo)]",
                    menuOpen ? "-rotate-45" : "translate-y-1",
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <nav
              className="flex h-full flex-col justify-center gap-2 px-8 pb-20"
              aria-label="Mobile"
            >
              {[...primaryNav, { label: "Contact", href: "/contact" }].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.06 + i * 0.06,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-[var(--hairline)] py-5 text-3xl font-medium tracking-[-0.03em] text-bright"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
