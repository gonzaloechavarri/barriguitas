"use client";

import { pressTextControlClasses } from "@/components/motion/press-motion";
import type { HoyTask } from "@/lib/services/hoy.service";
import {
  formatHoyOverdueLabel,
  formatListItemDueDate,
} from "@/lib/data/utils/dates";

type HoyTaskRowProps = {
  task: HoyTask;
  dateSuffix?: string | null;
  onToggle: () => void;
  onOpenList: () => void;
};

export function HoyTaskRow({
  task,
  dateSuffix = null,
  onToggle,
  onOpenList,
}: HoyTaskRowProps) {
  const { item } = task;

  return (
    <div className="flex items-start gap-3.5 rounded-2xl px-1 py-3.5">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={item.completed}
        aria-label="Marcar completado"
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border motion-safe:transition-[background-color,border-color,transform] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] border-white/15 bg-white/[0.02] touch-manipulation ${pressTextControlClasses}`}
      />

      <button
        type="button"
        onClick={onOpenList}
        className={`min-w-0 flex-1 text-left touch-manipulation ${pressTextControlClasses}`}
      >
        <span className="block text-[0.9375rem] font-light leading-snug tracking-[-0.01em] text-white/80">
          {item.text}
          {dateSuffix ? (
            <span className="text-white/35"> · {dateSuffix}</span>
          ) : null}
        </span>
        <span className="mt-1 block text-xs font-light tracking-[-0.01em] text-white/30">
          {task.listIcon} {task.listName}
        </span>
      </button>
    </div>
  );
}

type HoyTaskSectionProps = {
  title: string;
  tasks: HoyTask[];
  dateSuffixForTask?: (task: HoyTask) => string | null;
  onToggle: (task: HoyTask) => void;
  onOpenList: (task: HoyTask) => void;
};

export function HoyTaskSection({
  title,
  tasks,
  dateSuffixForTask,
  onToggle,
  onOpenList,
}: HoyTaskSectionProps) {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col">
      <h2 className="mb-1 px-1 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-white/30">
        {title}
      </h2>

      <div className="flex flex-col">
        {tasks.map((task) => (
          <HoyTaskRow
            key={task.item.id}
            task={task}
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
