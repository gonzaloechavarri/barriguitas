"use client";

import { pressTextControlClasses } from "@/components/motion/press-motion";
import type { HoyTask } from "@/lib/services/hoy.service";
import {
  formatHoyOverdueLabel,
  formatListItemDueDate,
} from "@/lib/data/utils/dates";

export type HoySectionVariant = "overdue" | "today" | "upcoming";

type HoyTaskRowProps = {
  task: HoyTask;
  dateSuffix?: string | null;
  variant: HoySectionVariant;
  onToggle: () => void;
  onOpenList: () => void;
};

const rowVariantStyles: Record<HoySectionVariant, { text: string; meta: string }> = {
  overdue: {
    text: "text-white/85",
    meta: "text-white/35",
  },
  today: {
    text: "text-white/90",
    meta: "text-white/32",
  },
  upcoming: {
    text: "text-white/70",
    meta: "text-white/28",
  },
};

export function HoyTaskRow({
  task,
  dateSuffix = null,
  variant,
  onToggle,
  onOpenList,
}: HoyTaskRowProps) {
  const { item } = task;
  const styles = rowVariantStyles[variant];

  return (
    <div className="flex items-start gap-2 rounded-2xl px-2 py-2 sm:gap-3 sm:px-3 sm:py-2.5">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={item.completed}
        aria-label="Marcar completado"
        className={`flex h-11 w-11 shrink-0 items-center justify-center touch-manipulation motion-safe:transition-[background-color,border-color,transform] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] sm:h-10 sm:w-10 ${pressTextControlClasses}`}
      >
        <span
          className={`flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-[0.4rem] border sm:h-5 sm:w-5 ${
            variant === "overdue"
              ? "border-rose-400/25 bg-rose-500/[0.06]"
              : "border-white/15 bg-white/[0.02]"
          }`}
        />
      </button>

      <button
        type="button"
        onClick={onOpenList}
        className={`min-h-[2.75rem] min-w-0 flex-1 py-1.5 text-left touch-manipulation sm:min-h-0 sm:py-0.5 ${pressTextControlClasses}`}
      >
        <span
          className={`block text-[1rem] font-light leading-snug tracking-[-0.01em] sm:text-[0.9375rem] ${styles.text}`}
        >
          {item.text}
          {dateSuffix ? (
            <span className={variant === "overdue" ? "text-rose-300/45" : "text-white/35"}>
              {" "}
              · {dateSuffix}
            </span>
          ) : null}
        </span>
        <span
          className={`mt-1 block text-xs font-light tracking-[-0.01em] ${styles.meta}`}
        >
          {task.listIcon} {task.listName}
        </span>
      </button>
    </div>
  );
}

type HoyTaskSectionProps = {
  title: string;
  tasks: HoyTask[];
  variant: HoySectionVariant;
  dateSuffixForTask?: (task: HoyTask) => string | null;
  onToggle: (task: HoyTask) => void;
  onOpenList: (task: HoyTask) => void;
};

const sectionVariantStyles: Record<
  HoySectionVariant,
  { container: string; title: string; indicator?: string }
> = {
  overdue: {
    container:
      "rounded-[1.375rem] border border-rose-500/10 bg-rose-500/[0.035] px-1 py-1 sm:rounded-3xl sm:px-2 sm:py-2",
    title: "text-rose-300/55",
    indicator: "bg-rose-400/75",
  },
  today: {
    container:
      "rounded-[1.375rem] border border-white/[0.07] bg-white/[0.025] px-1 py-1 sm:rounded-3xl sm:px-2 sm:py-2",
    title: "text-white/40",
  },
  upcoming: {
    container: "px-1 py-0.5",
    title: "text-white/28",
  },
};

export function HoyTaskSection({
  title,
  tasks,
  variant,
  dateSuffixForTask,
  onToggle,
  onOpenList,
}: HoyTaskSectionProps) {
  if (tasks.length === 0) {
    return null;
  }

  const styles = sectionVariantStyles[variant];

  return (
    <section className="flex flex-col gap-2.5">
      <h2
        className={`flex items-center gap-2 px-2 text-[0.6875rem] font-medium uppercase tracking-[0.1em] ${styles.title}`}
      >
        {styles.indicator ? (
          <span
            aria-hidden
            className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${styles.indicator}`}
          />
        ) : null}
        {title}
        <span className="font-normal normal-case tracking-normal text-white/20">
          · {tasks.length}
        </span>
      </h2>

      <div className={styles.container}>
        {tasks.map((task) => (
          <HoyTaskRow
            key={task.item.id}
            task={task}
            variant={variant}
            dateSuffix={dateSuffixForTask?.(task) ?? null}
            onToggle={() => onToggle(task)}
            onOpenList={() => onOpenList(task)}
          />
        ))}
      </div>
    </section>
  );
}

export function hoyOverdueSuffix(task: HoyTask): string | null {
  if (!task.item.dueDate) return null;
  return formatHoyOverdueLabel(task.item.dueDate);
}

export function hoyUpcomingSuffix(task: HoyTask): string | null {
  if (!task.item.dueDate) return null;
  return formatListItemDueDate(task.item.dueDate);
}
