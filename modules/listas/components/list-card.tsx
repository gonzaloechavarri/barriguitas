"use client";

import { interactiveCardPressClasses } from "@/components/motion/card-motion";
import { pressControlClasses } from "@/components/motion/press-motion";
import { getPendingCount, pendingLabel } from "@/lib/services/lists.service";
import type { SharedList } from "@/lib/data/types/lists";
import { GlassCard } from "@/modules/nosotros/components/glass-card";

type ListCardProps = {
  list: SharedList;
  delay?: number;
  onSelect: () => void;
};

export function ListCard({ list, delay = 0, onSelect }: ListCardProps) {
  const pending = getPendingCount(list);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left touch-manipulation ${pressControlClasses}`}
    >
      <GlassCard
        className={`p-4 sm:p-5 ${interactiveCardPressClasses}`}
        delay={delay}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="flex items-center gap-2.5 text-base font-medium tracking-[-0.02em] text-white/85">
              <span role="img" aria-hidden>
                {list.icon}
              </span>
              {list.name}
            </p>
            <p className="mt-2 text-sm font-light tracking-[-0.01em] text-white/40">
              {pendingLabel(pending)}
            </p>
          </div>
        </div>
      </GlassCard>
    </button>
  );
}
