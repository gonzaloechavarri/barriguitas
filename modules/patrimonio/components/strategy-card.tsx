import type { WealthView } from "@/lib/data/types";
import { CardTitle, GlassCard } from "@/modules/nosotros/components/glass-card";

type StrategyCardProps = {
  strategy: WealthView["strategy"];
};

export function StrategyCard({ strategy }: StrategyCardProps) {
  return (
    <GlassCard className="p-6 sm:p-7" delay={160}>
      <CardTitle icon="📊">{strategy.cardTitle}</CardTitle>

      <p className="mt-8 text-xs font-light tracking-[-0.01em] text-white/30">
        {strategy.allocationsLabel}
      </p>

      <ul className="mt-4 flex flex-col gap-4">
        {strategy.allocations.map((allocation) => (
          <li
            key={`current-${allocation.label}`}
            className="flex items-center justify-between gap-6"
          >
            <span className="flex items-center gap-2.5 text-[0.9375rem] font-light tracking-[-0.01em] text-white/65">
              <span role="img" aria-hidden>
                {allocation.icon}
              </span>
              {allocation.label}
            </span>
            <span className="text-sm font-light tabular-nums tracking-[-0.01em] text-white/35">
              {allocation.percentage}
            </span>
          </li>
        ))}
      </ul>

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
