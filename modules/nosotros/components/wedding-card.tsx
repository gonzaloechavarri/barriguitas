"use client";

import { useEffect, useState } from "react";
import type { WeddingData } from "@/lib/services";
import {
  formatWeddingDate,
  getWeddingProgress,
  parseLocalDate,
} from "@/lib/data/utils";
import { CardTitle, GlassCard } from "./glass-card";

type WeddingCardProps = {
  data: WeddingData;
};

function getCountdownDays(weddingDate: string, now: Date): number {
  const diff = parseLocalDate(weddingDate).getTime() - now.getTime();

  if (diff <= 0) return 0;

  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function WeddingCard({ data }: WeddingCardProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const countdownDays = now ? getCountdownDays(data.date, now) : null;
  const progress = now
    ? getWeddingProgress(data.date, data.journeyStartDate, now)
    : 0;

  return (
    <GlassCard className="p-8 sm:p-10" delay={80}>
      <CardTitle icon="❤️">{data.cardTitle}</CardTitle>

      <div className="mt-10 min-h-[5.5rem] sm:mt-12">
        <div
          className={`transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            countdownDays !== null ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="block text-6xl font-light tabular-nums tracking-[-0.04em] text-white/95 sm:text-7xl">
            {countdownDays ?? "—"}
          </span>
          <p className="mt-2 text-base font-light leading-snug tracking-[-0.01em] text-white/40 sm:text-lg">
            {data.countdownLabel}
          </p>
        </div>
      </div>

      <p className="mt-8 text-base font-light tracking-[-0.01em] text-white/50 sm:text-lg">
        {formatWeddingDate(data.date)}
      </p>

      <div className="mt-10">
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso hacia nuestra boda"
          className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-white/25 via-white/40 to-white/25 transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-4 text-xs font-light tracking-[-0.01em] text-white/25">
          {data.progressMessage}
        </p>
      </div>
    </GlassCard>
  );
}
