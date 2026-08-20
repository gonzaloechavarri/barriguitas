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
    <div className="mx-auto w-full max-w-xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
      <HoyHeader dateLabel={summary.dateLabel} />

      {syncError && status !== "ready" ? (
        <p className="mt-4 text-sm font-light tracking-[-0.01em] text-amber-300/70">
          {syncError}
        </p>
      ) : null}

      <div className="mt-10 flex flex-col gap-8 sm:mt-12 sm:gap-10">
        <HoyTaskSection
          title="Hoy"
          tasks={summary.today}
          onToggle={onToggleTask}
          onOpenList={onOpenList}
        />

        <HoyTaskSection
          title="Vencidas"
          tasks={summary.overdue}
          dateSuffixForTask={hoyOverdueSuffix}
          onToggle={onToggleTask}
          onOpenList={onOpenList}
        />

        <HoyTaskSection
          title="Próximamente"
          tasks={summary.upcoming}
          dateSuffixForTask={hoyUpcomingSuffix}
          onToggle={onToggleTask}
          onOpenList={onOpenList}
        />
      </div>

      <HoyEmptyState show={isEmpty} />
    </div>
  );
}
