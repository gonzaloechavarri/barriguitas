"use client";

import { useMemo, useState } from "react";
import { pressControlClasses } from "@/components/motion/press-motion";
import type { WealthView } from "@/lib/data/types";
import type { StrategyDistribution } from "@/lib/data/types/editable";
import {
  canDecreaseAllocation,
  canIncreaseAllocation,
  sumStrategyDistribution,
  type StrategyAssetKey,
} from "@/lib/services/wealth-allocation.service";
import { applyPortfolioAllocationStep } from "@/lib/services/wealth-snapshot.service";
import { CardTitle, GlassCard } from "@/modules/nosotros/components/glass-card";

type StrategyCardProps = {
  strategy: WealthView["strategy"];
  distribution: StrategyDistribution;
};

const stepButtonClassName = `inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-base font-light leading-none tracking-[-0.02em] text-white/45 transition-colors hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white/65 disabled:pointer-events-none disabled:border-white/[0.04] disabled:bg-transparent disabled:text-white/15 touch-manipulation ${pressControlClasses}`;

function AllocationStepButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={stepButtonClassName}
    >
      {label === "Reducir" ? "−" : "+"}
    </button>
  );
}

export function StrategyCard({ strategy, distribution }: StrategyCardProps) {
  const [draft, setDraft] = useState<StrategyDistribution | null>(null);

  const current = draft ?? distribution;
  const total = useMemo(() => sumStrategyDistribution(current), [current]);

  function handleAdjust(key: StrategyAssetKey, delta: 1 | -1) {
    const next = applyPortfolioAllocationStep(current, key, delta);

    if (!next) {
      return;
    }

    setDraft(sumStrategyDistribution(next) === 100 ? null : next);
  }

  return (
    <GlassCard className="p-6 sm:p-7" delay={160}>
      <CardTitle icon="📊">{strategy.cardTitle}</CardTitle>

      <p className="mt-8 text-xs font-light tracking-[-0.01em] text-white/30">
        {strategy.allocationsLabel}
      </p>

      <ul className="mt-4 flex flex-col gap-3.5">
        {strategy.allocations.map((allocation) => {
          const key = allocation.key;
          const value = current[key];

          return (
            <li
              key={`current-${allocation.label}`}
              className="flex items-center justify-between gap-3"
            >
              <span className="min-w-0 flex-1 text-[0.9375rem] font-light tracking-[-0.01em] text-white/65">
                <span className="inline-flex items-center gap-2.5">
                  <span role="img" aria-hidden>
                    {allocation.icon}
                  </span>
                  {allocation.label}
                </span>
              </span>

              <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
                <AllocationStepButton
                  label={`Reducir ${allocation.label}`}
                  disabled={!canDecreaseAllocation(current, key)}
                  onClick={() => handleAdjust(key, -1)}
                />
                <span
                  aria-live="polite"
                  className="w-12 text-center text-sm font-light tabular-nums tracking-[-0.01em] text-white/75 sm:w-14"
                >
                  {value} %
                </span>
                <AllocationStepButton
                  label={`Aumentar ${allocation.label}`}
                  disabled={!canIncreaseAllocation(current)}
                  onClick={() => handleAdjust(key, 1)}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <p
        className={`mt-5 text-xs font-light tabular-nums tracking-[-0.01em] ${
          total === 100 ? "text-white/25" : "text-white/40"
        }`}
      >
        Total · {total} %
      </p>

      <div className="mt-8 border-t border-white/[0.05] pt-6">
        <p className="text-xs font-light tracking-[-0.01em] text-white/30">
          Objetivo
        </p>

        <ul className="mt-4 flex flex-col gap-3">
          {strategy.target.map((allocation) => (
            <li
              key={`target-${allocation.label}`}
              className="flex items-center justify-between gap-6"
            >
              <span className="flex items-center gap-2.5 text-sm font-light tracking-[-0.01em] text-white/45">
                <span role="img" aria-hidden>
                  {allocation.icon}
                </span>
                {allocation.label}
              </span>
              <span className="text-sm font-light tabular-nums tracking-[-0.01em] text-white/30">
                {allocation.percentage}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 text-xs font-light tracking-[-0.01em] text-white/40">
        {strategy.statusMessage}
      </p>

      <p className="mt-2 text-xs font-light tabular-nums tracking-[-0.01em] text-white/30">
        Desviación: {strategy.deviation}
      </p>
    </GlassCard>
  );
}
