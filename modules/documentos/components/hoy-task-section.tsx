"use client";

import { useEffect, useRef, useState } from "react";
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

const COMPLETE_HOLD_MS = 280;
const COMPLETE_EXIT_MS = 300;

type CompletePhase = "idle" | "done" | "exiting";

export function HoyTaskRow({
  task,
  dateSuffix = null,
  variant,
  onToggle,
  onOpenList,
}: HoyTaskRowProps) {
  const { item } = task;
  const styles = rowVariantStyles[variant];
  const [phase, setPhase] = useState<CompletePhase>("idle");
  const timersRef = useRef<number[]>([]);
  const pendingToggleRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      if (pendingToggleRef.current) {
        pendingToggleRef.current();
        pendingToggleRef.current = null;
      }
    };
  }, []);

  const isDone = phase !== "idle";
  const isExiting = phase === "exiting";

  const handleComplete = () => {
    if (phase !== "idle") return;

    pendingToggleRef.current = onToggle;
    setPhase("done");
    const holdTimer = window.setTimeout(() => {
      setPhase("exiting");
      const exitTimer = window.setTimeout(() => {
        pendingToggleRef.current = null;
        onToggle();
      }, COMPLETE_EXIT_MS);
      timersRef.current.push(exitTimer);
    }, COMPLETE_HOLD_MS);
    timersRef.current.push(holdTimer);
  };

  return (
    <div
      className={`overflow-hidden motion-safe:transition-[opacity,max-height,transform] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        isExiting
          ? "max-h-0 opacity-0 -translate-y-0.5"
          : "max-h-40 opacity-100 translate-y-0"
      }`}
    >
      <div className="flex items-start gap-2 rounded-2xl px-2 py-2 sm:gap-3 sm:px-3 sm:py-2.5">
        <button
          type="button"
          onClick={handleComplete}
          aria-pressed={isDone || item.completed}
          aria-label="Marcar completado"
          disabled={isDone}
          className={`flex h-11 w-11 shrink-0 items-center justify-center touch-manipulation motion-safe:transition-[background-color,border-color,transform] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] sm:h-10 sm:w-10 ${pressTextControlClasses}`}
        >
          <span
            aria-hidden
            className={`flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-[0.4rem] border motion-safe:transition-[background-color,border-color,transform] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] sm:h-5 sm:w-5 ${
              isDone
                ? "scale-100 border-emerald-400/35 bg-emerald-400/15"
                : variant === "overdue"
                  ? "border-rose-400/25 bg-rose-500/[0.06]"
                  : "border-white/15 bg-white/[0.02]"
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className={`text-emerald-300/90 motion-safe:transition-[opacity,transform] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                isDone ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
            >
              <path
                d="M2.5 6l2.5 2.5 4.5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenList}
          disabled={isDone}
          className={`min-h-[2.75rem] min-w-0 flex-1 py-1.5 text-left touch-manipulation sm:min-h-0 sm:py-0.5 ${pressTextControlClasses}`}
        >
          <span
            className={`block text-[1rem] font-light leading-snug tracking-[-0.01em] motion-safe:transition-[color,opacity] motion-safe:duration-250 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] sm:text-[0.9375rem] ${
              isDone
                ? "text-white/28 line-through decoration-white/35"
                : styles.text
            }`}
          >
            {item.text}
            {dateSuffix ? (
              <span
                className={
                  isDone
                    ? "text-white/20"
                    : variant === "overdue"
                      ? "text-rose-300/45"
                      : "text-white/35"
                }
              >
                {" "}
                · {dateSuffix}
              </span>
            ) : null}
          </span>
          <span
            className={`mt-1 block text-xs font-light tracking-[-0.01em] motion-safe:transition-opacity motion-safe:duration-250 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              isDone ? "opacity-40" : ""
            } ${styles.meta}`}
          >
            {task.listIcon} {task.listName}
          </span>
        </button>
      </div>
    </div>
  );
}

type HoyTaskSectionProps = {
  title: string;
  tasks: HoyTask[];
  variant: HoySectionVariant;
  /** Soft focus for the highest-priority section when several are visible. */
  emphasized?: boolean;
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

const emphasizedVariantStyles: Record<
  HoySectionVariant,
  { container: string; title: string; indicator?: string }
> = {
  overdue: {
    container:
      "rounded-[1.375rem] border border-rose-500/16 bg-rose-500/[0.05] px-1.5 py-1.5 sm:rounded-3xl sm:px-2.5 sm:py-2.5",
    title: "text-rose-300/70",
    indicator: "bg-rose-400/85",
  },
  today: {
    container:
      "rounded-[1.375rem] border border-white/[0.1] bg-white/[0.04] px-1.5 py-1.5 sm:rounded-3xl sm:px-2.5 sm:py-2.5",
    title: "text-white/52",
    indicator: "bg-white/55",
  },
  upcoming: {
    container:
      "rounded-[1.375rem] border border-white/[0.06] bg-white/[0.02] px-1 py-1 sm:rounded-3xl sm:px-2 sm:py-2",
    title: "text-white/36",
  },
};

export function HoyTaskSection({
  title,
  tasks,
  variant,
  emphasized = false,
  dateSuffixForTask,
  onToggle,
  onOpenList,
}: HoyTaskSectionProps) {
  if (tasks.length === 0) {
    return null;
  }

  const styles = emphasized
    ? emphasizedVariantStyles[variant]
    : sectionVariantStyles[variant];

  return (
    <section
      className={`flex flex-col gap-2.5 ${
        emphasized ? "gap-3" : ""
      }`}
    >
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
