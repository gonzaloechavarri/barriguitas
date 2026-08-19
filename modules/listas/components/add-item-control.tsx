"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { pressTextControlClasses } from "@/components/motion/press-motion";
import { formatListItemDueDate, LIST_DATE_LOCALE } from "@/lib/data/utils/dates";

type AddItemControlProps = {
  onAdd: (text: string, dueDate?: string | null) => void;
};

export function AddItemControl({ onAdd }: AddItemControlProps) {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const [dueDate, setDueDate] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  function openInput() {
    setExpanded(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function openDatePicker() {
    const input = dateInputRef.current;
    if (!input) return;

    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }

    input.click();
  }

  function reset() {
    setValue("");
    setDueDate(null);
  }

  function submit() {
    const trimmed = value.trim();
    if (!trimmed) return;

    onAdd(trimmed, dueDate);
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
      <div className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (!value.trim()) {
              setExpanded(false);
              reset();
            }
          }}
          placeholder="Escribir tarea..."
          aria-label="Escribir tarea"
          className="min-w-0 flex-1 bg-transparent text-[0.9375rem] font-light tracking-[-0.01em] text-white/80 outline-none placeholder:text-white/30"
        />

        <button
          type="button"
          onClick={openDatePicker}
          aria-label={dueDate ? "Cambiar fecha" : "Añadir fecha"}
          className={`shrink-0 px-1 text-base leading-none touch-manipulation ${pressTextControlClasses} ${
            dueDate ? "text-white/55" : "text-white/30"
          }`}
        >
          <span role="img" aria-hidden>
            📅
          </span>
        </button>

        <input
          ref={dateInputRef}
          type="date"
          lang={LIST_DATE_LOCALE}
          value={dueDate ?? ""}
          onChange={(event) => {
            setDueDate(event.target.value || null);
          }}
          tabIndex={-1}
          aria-hidden
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />

        <button
          type="button"
          onClick={submit}
          disabled={!value.trim()}
          className={`shrink-0 rounded-full px-3 py-1 text-sm font-light tracking-[-0.01em] text-white/70 disabled:opacity-30 touch-manipulation ${pressTextControlClasses}`}
        >
          Listo
        </button>
      </div>

      {dueDate ? (
        <p className="px-1 text-xs font-light tracking-[-0.01em] text-white/35">
          📅 {formatListItemDueDate(dueDate)}
        </p>
      ) : null}
    </div>
  );
}
