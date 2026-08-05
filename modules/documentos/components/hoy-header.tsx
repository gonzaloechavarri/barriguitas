"use client";

import { useEffect, useState } from "react";
import { FadingText } from "@/components/motion/fading-text";
import type { TodayAttentionState } from "@/lib/data/types";
import {
  getAttentionSubtitle,
  getTimeBasedGreeting,
} from "@/lib/services/greeting.service";

type HoyHeaderProps = {
  initialGreeting: string;
  names: string;
  initialSubtitle: string;
  attentionState: TodayAttentionState;
};

export function HoyHeader({
  initialGreeting,
  names,
  initialSubtitle,
  attentionState,
}: HoyHeaderProps) {
  const [greeting, setGreeting] = useState(initialGreeting);
  const [subtitle, setSubtitle] = useState(initialSubtitle);

  useEffect(() => {
    const refresh = () => {
      setGreeting(getTimeBasedGreeting(new Date()).message);
      setSubtitle(getAttentionSubtitle(attentionState));
    };

    refresh();
    const interval = setInterval(refresh, 60_000);
    return () => clearInterval(interval);
  }, [attentionState]);

  return (
    <header
      className="opacity-0 animate-content-enter"
      style={{ animationDelay: "0ms" }}
    >
      <FadingText
        as="h1"
        text={greeting}
        className="text-2xl font-normal tracking-[-0.02em] text-white/90 sm:text-[1.625rem]"
      />

      <p className="mt-3 text-base font-light tracking-[-0.01em] text-white/65 sm:text-lg">
        {names}
      </p>

      <FadingText
        as="p"
        text={subtitle}
        className="mt-4 text-sm font-light leading-relaxed tracking-[-0.01em] text-white/40 sm:text-[0.9375rem]"
      />
    </header>
  );
}
