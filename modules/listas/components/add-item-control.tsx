"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { pressTextControlClasses } from "@/components/motion/press-motion";
import { formatListItemDueDate } from "@/lib/data/utils/dates";
import { ListDatePickerTrigger } from "./list-date-picker-trigger";

type AddItemControlProps = {
  onAdd: (text: string, dueDate?: string | null) => void;
};

export function AddItemControl({ onAdd }: AddItemControlProps) {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const [dueDate, setDueDate] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<string | null>(null);

  function openInput() {
    setExpanded(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function reset() {
    setValue("");
    setDueDate(null);
    dueDateRef.current = null;
  }

  function updateDueDate(iso: string) {
    const next = iso || null;
    dueDateRef.current = next;
    setDueDate(next);
  }

  function resolveDueDate(): string | null {
    const fromInput = dateInputRef.current?.value;
    if (fromInput) {
      dueDateRef.current = fromInput;
      return fromInput;
    }

    return dueDateRef.current ?? dueDate;
  }

  function submit() {
    const trimmed = value.trim();
    if (!trimmed) return;

    onAdd(trimmed, resolveDueDate());
    reset();
    inputRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    }

    if (event.key === "Escape") {
      setExpanded(false);
      reset();
    }
  }

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={openInput}
        className={`mt-2 flex w-full items-center gap-2 rounded-2xl px-1 py-3 text-left text-sm font-light tracking-[-0.01em] text-white/45 touch-manipulation ${pressTextControlClasses}`}
      >
        <span aria-hidden className="text-base leading-none">
          +
        </span>
        Añadir
      </button>
    );
  }

  return (
    <div className="mt-2 flex flex-col gap-2">
      <div
        className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5"
        onBlur={(event) => {
          if (event.currentTarget.contains(event.relatedTarget as Node)) {
            return;
          }

          // iOS confirma la fecha al cerrar el picker; change/blur del input
          // pueden llegar después del blur del contenedor.
          window.setTimeout(() => {
            const hasText = Boolean(inputRef.current?.value.trim());
            const hasDate = Boolean(
              dateInputRef.current?.value || dueDateRef.current,
            );

            if (!hasText && !hasDate) {
              setExpanded(false);
              reset();
            }
          }, 0);
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribir tarea..."
          aria-label="Escribir tarea"
          className="min-w-0 flex-1 bg-transparent text-[0.9375rem] font-light tracking-[-0.01em] text-white/80 outline-none placeholder:text-white/30"
        />

        <ListDatePickerTrigger
          inputRef={dateInputRef}
          value={dueDate ?? ""}
          onChange={updateDueDate}
          active={dueDate != null}
        />

        <button
          type="button"
          onPointerDown={(event) => event.preventDefault()}
          onClick={submit}
          disabled={!value.trim()}
          className={`shrink-0 rounded-full px-3 py-1 text-sm font-light tracking-[-0.01em] text-white/70 disabled:opacity-30 touch-manipulation ${pressTextControlClasses}`}
        >
          Listo
        </button>
      </div>

      {dueDate ? (
        <p className="px-1 text-xs font-light tabular-nums tracking-[-0.01em] text-white/35">
          {formatListItemDueDate(dueDate)}
        </p>
      ) : null}
    </div>
  );
}
