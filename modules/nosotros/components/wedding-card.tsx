"use client";

import { useEffect, useState } from "react";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import type { WeddingData } from "@/lib/services";
import {
  daysRemaining,
  formatWeddingDate,
  getWeddingProgress,
  parseLocalDate,
} from "@/lib/data/utils";
import { CardTitle, GlassCard } from "./glass-card";
import { WeddingWeather } from "./wedding-weather";

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

  const isPast = now ? daysRemaining(data.date, now) < 0 : false;
  const countdownDays = now ? getCountdownDays(data.date, now) : null;
  const progress = now
    ? getWeddingProgress(data.date, data.journeyStartDate, now)
    : 0;

  return (
    <GlassCard className="p-8 sm:p-10" delay={80}>
      <CardTitle icon="💍">{data.cardTitle}</CardTitle>

      {isPast ? (
        <div className="mt-8 sm:mt-10">
          <p className="text-[1.625rem] font-light leading-snug tracking-[-0.03em] text-white/88 sm:text-[1.75rem]">
            Ya es un recuerdo nuestro
          </p>
          <p className="mt-3 text-[0.9375rem] font-light leading-relaxed tracking-[-0.01em] text-white/40 sm:text-base">
            El comienzo de nuestra vida juntos.
          </p>
        </div>
      ) : (
        <div className="mt-8 min-h-[5rem] sm:mt-10 sm:min-h-[5.5rem]">
          <div
            className={`transition-opacity duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              countdownDays !== null ? "opacity-100" : "opacity-0"
            }`}
          >
            <AnimatedCounter
              value={countdownDays}
              className="block text-[3.75rem] font-light tabular-nums leading-none tracking-[-0.04em] text-white/95 sm:text-7xl"
            />
            <p className="mt-2.5 text-[0.9375rem] font-light leading-snug tracking-[-0.01em] text-white/38 sm:text-base">
              {data.countdownLabel}
            </p>
          </div>
        </div>
      )}

      <p className="mt-7 text-[0.9375rem] font-light tracking-[-0.01em] text-white/48 sm:mt-8 sm:text-base">
        {formatWeddingDate(data.date)}
      </p>

      {isPast ? (
        <p className="mt-3 text-[0.9375rem] font-light tracking-[-0.01em] text-white/32">
          {data.location.name}
        </p>
      ) : (
        <WeddingWeather locationName={data.location.name} />
      )}

      {!isPast ? (
        <div className="mt-8 sm:mt-9">
          <div
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progreso hacia nuestra boda"
            className="h-[2px] w-full overflow-hidden rounded-full bg-white/[0.06]"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-white/20 via-white/35 to-white/20 motion-safe:transition-[width] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-3.5 text-xs font-light leading-relaxed tracking-[-0.01em] text-white/24">
            {data.progressMessage}
          </p>
        </div>
      ) : null}
    </GlassCard>
  );
}
