"use client";

import { useState, type ReactNode } from "react";
import {
  cardMotionClasses,
  interactiveCardPressClasses,
} from "@/components/motion/card-motion";

type SettingsSectionProps = {
  icon: string;
  title: string;
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
  delay?: number;
};

export function SettingsSection({
  icon,
  title,
  summary,
  children,
  defaultOpen = false,
  delay = 0,
}: SettingsSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <article
      className={`rounded-3xl border border-white/[0.06] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.2)] backdrop-blur-md backdrop-saturate-150 ${cardMotionClasses}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`flex w-full items-start justify-between gap-4 rounded-3xl px-6 py-5 text-left sm:px-7 ${interactiveCardPressClasses}`}
        aria-expanded={open}
      >
        <div className="min-w-0">
          <h2 className="flex items-center gap-2.5 text-sm font-medium tracking-[-0.01em] text-white/55">
            <span role="img" aria-hidden>
              {icon}
            </span>
            {title}
          </h2>
          {!open ? (
            <p className="mt-2 text-sm font-light tracking-[-0.01em] text-white/35">
              {summary}
            </p>
          ) : null}
        </div>

        <span
          aria-hidden
          className={`mt-0.5 shrink-0 text-sm font-light text-white/25 motion-safe:transition-transform motion-safe:duration-250 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            open ? "rotate-180" : ""
          }`}
        >
          ⌄
        </span>
      </button>

      <div
        className={`grid motion-safe:transition-[grid-template-rows] motion-safe:duration-250 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`border-t border-white/[0.05] px-6 pb-6 pt-5 sm:px-7 motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
