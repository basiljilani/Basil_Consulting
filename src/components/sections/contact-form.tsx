"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "@/components/ui/button";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string>;

const fieldClass =
  "w-full rounded-xl border border-[var(--hairline)] bg-white/[0.02] px-4 py-3 text-[0.9375rem] " +
  "text-bright placeholder:text-faint transition-colors duration-300 " +
  "hover:border-[var(--hairline-strong)] focus:border-basil-400/60 focus:bg-white/[0.04] focus:outline-none";

const labelClass = "block text-[0.75rem] tracking-[0.1em] text-faint uppercase";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setFormError(null);

    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      const payload = await res.json().catch(() => ({}));
      if (payload.errors) {
        setErrors(payload.errors);
        setStatus("idle");
      } else {
        setFormError(payload.error ?? "Something went wrong. Please email us directly.");
        setStatus("error");
      }
    } catch {
      setFormError("We could not reach the server. Please email us directly.");
      setStatus("error");
    }
  }

  return (
    <div className="panel relative overflow-hidden rounded-2xl p-8 md:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-[26rem] flex-col items-center justify-center text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-basil-400/30 bg-basil-400/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-6 w-6 text-basil-400"
              >
                <motion.path
                  d="m5 12.5 4.5 4.5L19 7.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
                />
              </svg>
            </span>
            <h2 className="mt-7 text-2xl font-medium tracking-[-0.025em] text-bright">
              Received.
            </h2>
            <p className="mt-3 max-w-sm leading-relaxed text-dim">
              A principal will reply within one business day — usually with a question
              rather than a brochure.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Honeypot */}
            <div aria-hidden="true" className="absolute -left-[9999px]">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={cn(fieldClass, "mt-2.5", errors.name && "border-red-500/60")}
                  placeholder="Jordan Ellis"
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-[0.8125rem] text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={cn(fieldClass, "mt-2.5", errors.email && "border-red-500/60")}
                  placeholder="jordan@company.com"
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-[0.8125rem] text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className={labelClass}>
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  className={cn(fieldClass, "mt-2.5")}
                  placeholder="Northwind Industries"
                />
              </div>

              <div>
                <label htmlFor="interest" className={labelClass}>
                  Area of interest
                </label>
                <select
                  id="interest"
                  name="interest"
                  defaultValue=""
                  className={cn(fieldClass, "mt-2.5 appearance-none bg-elev-1")}
                >
                  <option value="">Not sure yet</option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.short}>
                      {service.short}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                What are you trying to solve?
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={cn(
                  fieldClass,
                  "mt-2.5 resize-y",
                  errors.message && "border-red-500/60",
                )}
                placeholder="The decision we keep getting wrong, what we have tried, and what it costs us."
              />
              {errors.message && (
                <p id="message-error" className="mt-2 text-[0.8125rem] text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            {formError && (
              <p role="alert" className="text-[0.8125rem] text-red-400">
                {formError}
              </p>
            )}

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.75rem] leading-relaxed text-faint">
                We reply within one business day.
                <br />
                No sequences, no newsletter.
              </p>

              <button
                type="submit"
                disabled={status === "submitting"}
                className={cn(
                  "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-7",
                  "bg-basil-400 text-sm font-medium text-[#00160c]",
                  "transition-all duration-300 ease-[var(--ease-out-expo)]",
                  "hover:-translate-y-0.5 hover:bg-basil-300 hover:shadow-[0_8px_40px_-8px_rgba(77,250,162,0.55)]",
                  "disabled:pointer-events-none disabled:opacity-60",
                )}
              >
                {status === "submitting" ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#00160c]/30 border-t-[#00160c]" />
                    Sending
                  </>
                ) : (
                  <>
                    Send enquiry
                    <ArrowRight />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
