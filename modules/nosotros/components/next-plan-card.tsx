"use client";

import { useEffect, useState } from "react";
import { FadingText } from "@/components/motion/fading-text";
import type { WeddingData } from "@/lib/services";
import { formatTripCountdown } from "@/lib/data/utils";
import { CardTitle, GlassCard } from "./glass-card";

type NextPlanCardProps = {
  plan: WeddingData["nextPlan"];
};

export function NextPlanCard({ plan }: NextPlanCardProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  const countdown = now ? formatTripCountdown(plan.startDate, now) : null;

  return (
    <GlassCard className="flex flex-col p-6 sm:p-7" delay={240}>
      <CardTitle icon="✈️">{plan.cardTitle}</CardTitle>

      <div className="mt-10 sm:mt-12">
        <p className="text-xl font-light leading-snug tracking-[-0.02em] text-white/80 sm:text-[1.375rem]">
          {plan.destination}
        </p>

        {countdown ? (
          <FadingText
            as="p"
            text={countdown}
            className="mt-4 text-xs font-light leading-relaxed tracking-[-0.01em] text-white/30"
          />
        ) : null}
      </div>
    </GlassCard>
  );
}
