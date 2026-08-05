import { CardTitle, GlassCard } from "./glass-card";

type MilestonesCardProps = {
  milestones: string[];
};

export function MilestonesCard({ milestones }: MilestonesCardProps) {
  return (
    <GlassCard className="flex flex-col p-6 sm:p-7" delay={160}>
      <CardTitle icon="📋">Próximos hitos</CardTitle>

      <ul className="mt-8 flex flex-col gap-5">
        {milestones.map((milestone) => (
          <li
            key={milestone}
            className="flex items-center gap-3.5 text-[0.9375rem] font-light tracking-[-0.01em] text-white/65"
          >
            <span
              aria-hidden
              className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/20"
            />
            {milestone}
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
