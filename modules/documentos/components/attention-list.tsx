"use client";

import { useEffect, useState } from "react";
import type { TodaySummary } from "@/lib/services";
import { getTodaySummary } from "@/lib/services";
import { AttentionCard } from "./attention-card";

type AttentionListProps = {
  initialSummary: TodaySummary;
};

export function AttentionList({ initialSummary }: AttentionListProps) {
  const [summary, setSummary] = useState(initialSummary);

  useEffect(() => {
    const refresh = async () => {
      setSummary(await getTodaySummary());
    };

    const interval = setInterval(refresh, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 flex flex-col gap-3 sm:mt-14 sm:gap-3.5">
      {summary.items.map((item, index) => (
        <AttentionCard
          key={item.title}
          icon={item.icon}
          title={item.title}
          subtitle={item.subtitle}
          delay={80 + index * 60}
        />
      ))}
    </div>
  );
}
