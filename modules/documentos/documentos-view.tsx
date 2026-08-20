"use client";

import type { SharedListsStatus } from "@/lib/hooks/use-shared-lists";
import type { HoySummary } from "@/lib/services/hoy.service";
import { hasHoyContent } from "@/lib/services/hoy.service";
import { HoyEmptyState } from "./components/hoy-empty-state";
import { HoyHeader } from "./components/hoy-header";
import {
  HoyTaskSection,
  hoyOverdueSuffix,
  hoyUpcomingSuffix,
} from "./components/hoy-task-section";
import type { HoyTask } from "@/lib/services/hoy.service";

type DocumentosViewProps = {
  summary: HoySummary;
  status: SharedListsStatus;
  syncError: string | null;
  onToggleTask: (task: HoyTask) => void;
  onOpenList: (task: HoyTask) => void;
};

export function DocumentosView({
  summary,
  status,
  syncError,
  onToggleTask,
  onOpenList,
}: DocumentosViewProps) {
  const isEmpty = !hasHoyContent(summary);

  return (
    <div className="mx-auto w-full max-w-xl px-5 pb-8 pt-2 sm:px-10 sm:pb-10 sm:pt-4">
      <HoyHeader dateLabel={summary.dateLabel} />

      {syncError && status !== "ready" ? (
        <p className="mt-4 text-sm font-light tracking-[-0.01em] text-amber-300/70">
          {syncError}
        </p>
      ) : null}

      {isEmpty ? (
        <HoyEmptyState />
      ) : (
        <div className="mt-8 flex flex-col gap-7 sm:mt-10 sm:gap-9">
          <HoyTaskSection
            title="Vencidas"
            variant="overdue"
            tasks={summary.overdue}
            dateSuffixForTask={hoyOverdueSuffix}
            onToggle={onToggleTask}
            onOpenList={onOpenList}
          />

          <HoyTaskSection
            title="Hoy"
            variant="today"
            tasks={summary.today}
            onToggle={onToggleTask}
            onOpenList={onOpenList}
          />

          <HoyTaskSection
            title="Próximamente"
            variant="upcoming"
            tasks={summary.upcoming}
            dateSuffixForTask={hoyUpcomingSuffix}
            onToggle={onToggleTask}
            onOpenList={onOpenList}
          />
        </div>
      )}
    </div>
  );
}
