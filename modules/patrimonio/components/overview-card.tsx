import type { WealthView } from "@/lib/data/types";
import { CardTitle, GlassCard } from "@/modules/nosotros/components/glass-card";

type OverviewCardProps = {
  data: Pick<WealthView, "cardTitle" | "subtitle" | "performance">;
};

export function OverviewCard({ data }: OverviewCardProps) {
  return (
    <GlassCard className="p-8 sm:p-10" delay={80}>
      <CardTitle icon="🌱">{data.cardTitle}</CardTitle>

      <p className="mt-4 text-sm font-light tracking-[-0.01em] text-white/40 sm:text-[0.9375rem]">
        {data.subtitle}
      </p>

      <dl className="mt-10 flex flex-col gap-4 sm:mt-12">
        {data.performance.map((metric) => (
          <div
            key={metric.label}
            className="flex items-baseline justify-between gap-6"
          >
            <dt className="text-sm font-light tracking-[-0.01em] text-white/50">
              {metric.label}
            </dt>
            <dd className="text-sm font-light tabular-nums tracking-[-0.01em] text-white/50">
              {metric.change}
            </dd>
          </div>
        ))}
      </dl>
    </GlassCard>
  );
}
