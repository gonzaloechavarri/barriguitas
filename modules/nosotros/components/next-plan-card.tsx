"use client";

import { useEffect, useState } from "react";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import type { WeddingData } from "@/lib/services";
import {
  formatCoupleEventDate,
  formatEventDaysRemaining,
  parseLocalDate,
} from "@/lib/data/utils";
import { CardTitle, GlassCard } from "./glass-card";

type NextPlanCardProps = {
  plan: WeddingData["nextPlan"];
};

function getCountdownDays(startDate: string, now: Date): number {
  const diff = parseLocalDate(startDate).getTime() - now.getTime();

  if (diff <= 0) return 0;

  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function NextPlanCard({ plan }: NextPlanCardProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  if (now && formatEventDaysRemaining(plan.startDate, now) === null) {
    return null;
  }

  const countdownDays = now ? getCountdownDays(plan.startDate, now) : null;

  return (
    <GlassCard className="p-8 sm:p-10" delay={160}>
      <CardTitle icon="✈️">{plan.cardTitle}</CardTitle>

      <p className="mt-8 text-xl font-light leading-snug tracking-[-0.02em] text-white/82 sm:mt-9 sm:text-[1.375rem]">
        {plan.destination}
      </p>

      <div className="mt-7 min-h-[4rem] sm:mt-8">
        <div
          className={`transition-opacity duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            countdownDays !== null ? "opacity-100" : "opacity-0"
          }`}
        >
          <AnimatedCounter
            value={countdownDays}
            className="block text-[2.75rem] font-light tabular-nums leading-none tracking-[-0.04em] text-white/88 sm:text-5xl"
          />
          <p className="mt-2 text-[0.9375rem] font-light tracking-[-0.01em] text-white/35">
            días para despegar
          </p>
        </div>
      </div>

      <p className="mt-6 text-[0.9375rem] font-light tracking-[-0.01em] text-white/42">
        {formatCoupleEventDate(plan.startDate)}
      </p>
    </GlassCard>
  );
}
